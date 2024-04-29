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
Roles=['admin','staff','patient']


@app.route('/', methods=['POST','GET'])
def home():
    #Post data into database
    role ='batates'
    name='afify'
    if role not in Roles:
        return {
            'message': 'Role not found'
        }
    users.insert_one({'name': name,'role': role})
    print('hello')

    return {
        'message': 'Hello World!'
    }

    #Get data from database
    # mongoUsers = users.find()
    #     user_list = []
    #     for user in mongoUsers:
    #         user_dict = {
    #             'name': user['name'],  # Replace 'username' with the actual field names you want to include
    #             'role': user['role'],        # Replace 'email' with the actual field names you want to include
    #             # Add more fields as needed
    #         }
    #         user_list.append(user_dict)

    #     return jsonify({'users': user_list})

if __name__ == "__main__":
    app.run(debug=True, port=8008)



