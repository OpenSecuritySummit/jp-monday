from jira import JIRA
from osbot_jira.api.jira_server.API_Jira import API_Jira

import json

    
class JiraIssueWrangler():
    
    def __init__(self, issue_id):
        self.issue = {}
        self.issue_id = issue_id
        self.api_jira = API_Jira()
        self.api_jira._jira = JIRA(server='https://ubuntu-policy.atlassian.net/')
        
    def _get_issue(self, issue_id):
        return self.api_jira.issue(issue_id)
                    
    def _get_related_issues(self, issue_id):
        return issue
        
    def wrangle(self):
        issue = self._get_issue(self.issue_id)
        
        for link_id in issue_links:
            for issue_link in issue_links[link_id]:
                if issue_link['Link Type'] == self.link_type:
        
        return json.dumps(base_issue)


class Issue():
    
    def __init__(self, key, summary, status, related_issues):
        self.key = key
        self.summary = summary
        self.status = status
        self.related_issues = related_issues

        