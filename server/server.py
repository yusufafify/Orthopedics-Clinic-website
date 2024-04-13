from flask import Flask, render_template
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def home():
    print('hello')
    return {
        'message': 'Hello World'
    }

if __name__ == "__main__":
    app.run(debug=True, port=8080)
