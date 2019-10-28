from jira import JIRA
from osbot_jira.api.jira_server.API_Jira import API_Jira

import json

    
class JiraIssueWrangler():
    
    def __init__(self, issue_id):
        self.issue_id = issue_id
        self.api_jira = API_JIRA()
        self.api_jira._jira = JIRA(server='https://ubuntu-policy.atlassian.net/')
    
    def wrangle(self):
        issue = self.api_jira.issue(issue_id)
        return json.dumps(issue)
