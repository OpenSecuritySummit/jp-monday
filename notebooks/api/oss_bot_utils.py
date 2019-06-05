def ping():
    return 'pong ...'

class ossbot_utils:
    pass

def show_png(png_data,height=200):
    html = '<img style="border:1px solid black;height:{0}pt;" align="left" src="data:image/png;base64,{1}"/>'.format(height,png_data)
    display_html(html, raw=True)    