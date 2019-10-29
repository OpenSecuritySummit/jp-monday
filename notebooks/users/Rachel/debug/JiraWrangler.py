from jira import JIRA
from osbot_jira.api.jira_server.API_Jira import API_Jira

import json

    

class Issue():
    
    def __init__(self, key, summary, status, related_issues):
        self.key = key
        self.summary = summary
        self.status = status
        self.related_issues = related_issues


class JiraIssueWrangler():
    
    def __init__(self, issue_id):
        self.issue_id = issue_id
        self.api_jira = API_Jira()
        self.api_jira._jira = JIRA(server='https://ubuntu-policy.atlassian.net/')
        
    def _get_issue(self, issue_id):
        return self.api_jira.issue(issue_id)
                    
    def _get_related_issues(self, issue_id):
        return issue
        
    def wrangle(self):
        issue_response = self._get_issue(self.issue_id)
        
        issue = Issue(
            issue_response['Key'],
            issue_response['Summary'],
            issue_response['Status'],
            issue_response['Related Issues'],
        )
        
        return issue.toJSON();
        



        