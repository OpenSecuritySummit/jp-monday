from IPython.display        import display_html, HTML, Javascript,display
from osbot_aws.apis.Lambda import Lambda
from jira import JIRA
from osbot_jira.api.jira_server.API_Jira import API_Jira


class Wardley_Map:
    def __init__(self):
        self.depth    = 2
        self.map_code = ""
        self.map_code += 'window.maps.connection_arrows="to"\n'
                    
    def maps_create(self, code, height= 300):
        aws_lambda = Lambda('osbot_browser.lambdas.lambda_browser')
        params = ["maps", "exec_js"]
        params.extend(code.split(' '))

        payload = {"params": params,
                   'data': {}}
        png_data = aws_lambda.invoke(payload)
        self.show_png(png_data, height)
    #    return png_data

    def show_png(self, png_data,height=200):
        html = '<img style="_width:100%;height:{0}px;border:1px solid black" align="left" src="data:image/png;base64,{1}"/>'.format(height,png_data)
        display_html(html, raw=True)      


    def add_node(self, summary, evolution, depth_delta=0):
        self.map_code += 'add("{0}", {1}, {2})\n'.format(summary, self.resolve_evolution(evolution), self.depth + depth_delta)
    
    def add_link(self, from_node, to_node):
        self.map_code += 'link("{0}", "{1}")\n'.format(from_node, to_node)

    def show_map(self,height= 300):
        self.maps_create(self.map_code,height)

    def resolve_evolution(self,evolution):
        mapping = { 'Genesis' : 0.5 , 'Custom Built': 1.3 , 'Product': 2.5, 'Commodity': 4}
        return mapping[evolution]



class Jira_Map:        
    def __init__(self, root_id):
        self.root_id        = root_id
        self.api_jira       = API_Jira()
        self.wmap           = Wardley_Map()        
        self.link_type      = 'needs'
        self.api_jira._jira = JIRA(server='https://ubuntu-policy.atlassian.net/')

    def add_node(self,issue_id,depth_delta=0):
        issue = self.api_jira.issue(issue_id)
        summary = issue['Summary']        
        self.wmap.add_node(issue['Summary'], issue['Status'],depth_delta)

        issue.get('Issue Links')
        summary = issue.get('Summary')
        issue_links = issue.get('Issue Links')
        for link_id in issue_links:
            for issue_link in issue_links[link_id]:
                if issue_link['Link Type'] == self.link_type:
                    self.add_node(link_id, depth_delta + 1.5)
                    self.wmap.add_link(summary, issue_link.get('Summary')) 
        
    def create(self):        
        self.add_node(self.root_id)
        return self
    
    def show(self,height=300):
        self.wmap.show_map(height)