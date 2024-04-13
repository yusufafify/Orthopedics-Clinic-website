from flask import Flask, render_template
from flask_cors import CORS
from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://abdullahfouad235:abdullahfouad532@crepezinger.cnpysts.mongodb.net/orthopedic-clinic?retryWrites=true&w=majority&appName=crepeZinger"

# Create a new client and connect to the server


app = Flask(__name__)
CORS(app)
client = MongoClient(uri)

db=client['orthopedic-clinic']
users = db['users']
# Roles=['admin','staff','patient']


@app.route('/', methods=['GET'])
def home():
    print('hello')

    return {
        'message': 'Hello World!'
    }


if __name__ == "__main__":
    app.run(debug=True, port=8080)

