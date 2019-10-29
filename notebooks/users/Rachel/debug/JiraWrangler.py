import json

from jira import JIRA
from osbot_jira.api.jira_server.API_Jira import API_Jira


class Issue():
    
    def __init__(self, key, summary, status, related_issues):
        self.key = key
        self.summary = summary
        self.status = status
        self.related_issues = related_issues
        
    def toJson(self):

        return json.dumps(
            self,
            default=lambda o: o.__dict__,
            sort_keys=False,
            indent=2
        )


class JiraIssueWrangler():
    
    def __init__(self, issue_id):
        self.issue_id = issue_id
        self.api_jira = API_Jira()
        self.api_jira._jira = JIRA(server='https://ubuntu-policy.atlassian.net/')
        
    def _create_issue(self, response):
        return Issue(
            response['Key'],
            response['Summary'],
            response['Status'],
            self._get_related_issues(response)
        )
    
    def _get_related_issues(self, response):
        related_issues = []
        
        for key, related_issue in response['Issue Links'].items():
            related_issue_response = self.api_jira.issue(key)
            related_issues.append(self._get_issue(related_issue_response))
            
        return related_issues
                    
    def wrangle(self):
        base_issue_response = self.api_jira.issue(self.issue_id)
        issue = self._create_issue(base_issue_response)
        return issue.toJSON();




        