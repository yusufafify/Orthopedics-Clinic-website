from flask import Flask, jsonify, render_template, request, g
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
import jwt
from datetime import datetime, timedelta
from functools import wraps
from auth_middleware import token_required
import bcrypt

uri = "mongodb+srv://abdullahfouad235:abdullahfouad532@crepezinger.cnpysts.mongodb.net/orthopedic-clinic?retryWrites=true&w=majority&appName=crepeZinger"
# uri = "mongodb://localhost:27017/"

# Create a new client and connect to the server


app = Flask(__name__)
CORS(app)
client = MongoClient(uri)
app.config['SECRET_KEY'] = 'r-DbyQUte22QfwuUYTY0KQ'
db=client['orthopedic-clinic']
users = db['users']
# Roles=['admin','staff','patient']


#a Test Route
@app.route('/', methods=['GET'])
def home():
    print('hello')

    return {
        'message': 'Hello World!'
    }


#This route is used to login a user
# TODO add logic to check hashed password
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password').encode('utf-8')


        user = users.find_one({ 'email': email })
        if user and bcrypt.checkpw(password, user['password']):
            token = jwt.encode({
			      'email': email,
            'role': user["role"],
            'exp' : datetime.utcnow() + timedelta(minutes = 1)
		}, app.config['SECRET_KEY'])
            return jsonify({
                'message': 'success',
                'token': token.decode('UTF-8'),
                
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


#This route is used to register a new user
# TODO add logic to check if user is already registerd
# TODO hash password before saving it in the database
# TODO use same logic used in the login to generate a jwt
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email=data.get('email')

        user = users.find_one({ 'email': email })
        if user: 
            return jsonify({ 'error': 'invalid email' }), 409

        password=data.get('password').encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

        phone=data.get('phone')
        first_name=data.get('firstName')
        last_name=data.get('lastName')
        age=data.get('age')
        address=data.get('address')
        gender=data.get('gender')
        users.insert_one({
            'email':email,  
            'password':hashed_password,
            'phoneNumber':phone,
            'name':first_name+' '+last_name,
            'role':'patient',
            'gender': gender,
            'age':int(age),
            'address': address
        })

        token = jwt.encode({
            'email': email,
            'role': 'patient',
            'exp': datetime.utcnow() + timedelta(minutes = 1)
        }, app.config['SECRET_KEY'])

        return jsonify({
                'message':'success',
                'token': token.decode('utf-8')
            })
    except Exception as e:
        return jsonify({
            'message': 'error',
            'error': str(e)
    })



@app.route('/personal_data', methods=['GET'])
@token_required
def get_patient_data():
    try:
        email = g.user_data['email']
        user = users.find_one({ 'email': email })
        
        if not user: 
            return jsonify({ 'error': 'no patient found' }), 404

        user_data = {
            'email': user['email'],
            'name': user['name'],
            'role': user['role'],
            'gender': user['gender'],
            'age': user['age'],
            'address': user['address']
        }
        
        return jsonify(user_data)

    except Exception as err:
        return jsonify({ 'error': str(err) }), 500


# @app.route('/appointment_booking', methods=['GET'])
# @token_required
# def appointment_booking():



if __name__ == "__main__":
    app.run(debug=True, port=8080)

