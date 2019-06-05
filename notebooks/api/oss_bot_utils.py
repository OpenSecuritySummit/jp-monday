def ping():
    return 'pong ...'

class ossbot_utils:
    pass

def render_example():
    aws_lambda = Lambda('osbot_browser.lambdas.lambda_browser')
    payload = {"params": ["render", "examples/wardley_map/cup-of-tea.html"],
               'data': {}}
    png_data = aws_lambda.invoke(payload)
    show_png(png_data)
    def show_png(png_data,height=200):
        html = '<img style="border:1px solid black;height:{0}pt;" align="left" src="data:image/png;base64,{1}"/>'.format(height,png_data)
        display_html(html, raw=True)    