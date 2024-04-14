from flask import Flask, jsonify, render_template, request
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


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password')
        user = users.find_one({'email': email, 'password': password})
        if user:
            return jsonify({
                'message': 'success',
            })
        else:
            return jsonify({
                'message': 'error',
            })
    except Exception as e:
        print("Error:", e)
        return jsonify({
            'message': 'error',
            'error': str(e)
        })



@app.route('/register', methods=['POST'])
def register():
    try:
      data = request.get_json()
      email=data.get('email')
      password=data.get('password')
      phone=data.get('phone')
      first_name=data.get('firstName')
      last_name=data.get('lastName')
      age=data.get('age')
      users.insert_one({
          'email':email,  
          'password':password,
          'phoneNumber':phone,
          'name':first_name+' '+last_name,
          'role':'patient',
          'age':int(age),
      })
      return jsonify({
              'message':'success',
          })
    except Exception as e:
        return jsonify({
            'message': 'error',
            'error': str(e)
        })
    



if __name__ == "__main__":
    app.run(debug=True, port=8080)

