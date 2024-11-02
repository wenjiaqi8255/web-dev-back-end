import gradio as gr
import openai

import getpass
openai.api_key = ""

def greet(name):
    return "Hello " + name + "!!"

iface = gr.Interface(fn=greet, inputs="text", outputs="text")
iface.launch()