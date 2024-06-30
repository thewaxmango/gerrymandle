from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("main.html")

app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)