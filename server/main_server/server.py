from flask import Flask, jsonify, render_template, request, g
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timedelta
from functools import wraps
# from auth_middleware import token_required

uri = "mongodb+srv://abdullahfouad235:abdullahfouad532@crepezinger.cnpysts.mongodb.net/orthopedic-clinic?retryWrites=true&w=majority&appName=crepeZinger"
# uri = "mongodb://localhost:27017/"

# Create a new client and connect to the server


app = Flask(__name__)
CORS(app)
client = MongoClient(uri)
app.config['SECRET_KEY'] = 'r-DbyQUte22QfwuUYTY0KQ'
app.config['REFRESH_SECRET_KEY'] = 'r-DbyQUtefufnmfdusaYTY0KQ'
db=client['orthopedic-clinic']
users = db['users']
jwt = JWTManager(app)
# Roles=['admin','staff','patient']


#a Test Route
@app.route('/', methods=['GET'])
def home():
    print('hello')

    return {
        'message': 'Hello World!'
    }


#This route is used to login a user
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password')
        user = users.find_one({'email': email, 'password': password})
        if user:
            token = create_access_token({
			      'email': email,
            'role': user["role"],
            'exp' : datetime.utcnow() + timedelta(minutes = 1)
		}, app.config['SECRET_KEY'])
            refresh_token = create_refresh_token({
			      'email': email,
            'role': user["role"]
		},expires_delta=timedelta(days=1))
            return jsonify({
                'message': 'success',
                'token': token,
                'refresh_token': refresh_token
                
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
      address=data.get('address')
      gender=data.get('gender')
      users.insert_one({
          'email':email,  
          'password':password,
          'phoneNumber':phone,
          'name':first_name+' '+last_name,
          'role':'patient',
          'gender': gender,
          'age':int(age),
          'address': address
      })
      return jsonify({
              'message':'success',
          })
    except Exception as e:
        return jsonify({
            'message': 'error',
            'error': str(e)
        })

@app.route('/refresh')
@jwt_required(refresh=True)
def TokenRefresh():
    current_user = get_jwt_identity()
    print(current_user)
    expires = timedelta(minutes=1)
    access_token = create_access_token(identity={'email': current_user['email'], 'role':current_user['role']}, 
                                       secret_key=app.config['SECRET_KEY'], 
                                       expires_delta=expires)
    return jsonify({'access_token': access_token})

@app.route('/personal_data', methods=['GET'])
@jwt_required()
def get_patient_data():
    try:
        current_user = get_jwt_identity()
        email = current_user['email']
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

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return (
        jsonify({"message": "The token has expired.", "error": "token_expired"}),
        401,
    )

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return (
        jsonify(
            {"message": "Signature verification failed.", "error": "invalid_token"}
        ),
        401,
    )

@jwt.unauthorized_loader
def missing_token_callback(error):
    return (
        jsonify(
            {
                "description": "Request does not contain an access token.",
                "error": "authorization_required",
            }
        ),
        401,
    )
@jwt.additional_claims_loader
def add_claims_to_jwt(identity):
    if identity == 1:
        return {"is_admin": True}
    return {"is_admin": False}



if __name__ == "__main__":
    app.run(debug=True, port=8080)

