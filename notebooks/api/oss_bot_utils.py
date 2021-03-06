from IPython.display        import display_html,display,Javascript
from osbot_aws.apis.Lambda  import Lambda

def ping():
    return 'pong ...'

class ossbot_utils:
    pass

def render_example(name):
    file = "examples/wardley_map/{0}.html".format(name)
    aws_lambda = Lambda('osbot_browser.lambdas.lambda_browser')
    payload = {"params": ["render", file],
               'data': {}}
    png_data = aws_lambda.invoke(payload)
    show_png(png_data)
    
def show_graph(graph, height=200):
    puml = graph.render_puml().puml
    result = Lambda('utils.puml_to_png').invoke({"puml": puml})
    png_data = result.get('png_base64')
    show_png(png_data, height)
    
def show_png(png_data,height=200):
    html = '<img style="border:1px solid black;height:{0}pt;" align="left" src="data:image/png;base64,{1}"/>'.format(height,png_data)
    display_html(html, raw=True)    

    
def maps_create(code):
    display(Javascript("$('.container').width('95%')"))
    aws_lambda = Lambda('osbot_browser.lambdas.lambda_browser')
    params = ["maps", "exec_js"]
    params.extend(code.split(' '))

    payload = {"params": params,
               'data': {}}
    png_data = aws_lambda.invoke(payload)
    show_png(png_data,600)

    