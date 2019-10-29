from jira import JIRA
from osbot_jira.api.jira_server.API_Jira import API_Jira

import json

    
class JiraIssueWrangler():
    
    def __init__(self, issue_id):
        self.issue_id = issue_id
        self.api_jira = API_Jira()
        self.api_jira._jira = JIRA(server='https://ubuntu-policy.atlassian.net/')
        
    def _get_issue(self, issue_id):
        issue = self.api_jira.issue(issue_id)
                    
    def wrangle(self):
        base_issue, issue = self._get_issue(self.issue_id)             
        return json.dumps(base_issue)
