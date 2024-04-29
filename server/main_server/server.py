from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import ReturnDocument
from pymongo.mongo_client import MongoClient
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import bcrypt
uri = "mongodb+srv://abdullahfouad235:abdullahfouad532@crepezinger.cnpysts.mongodb.net/orthopedic-clinic?retryWrites=true&w=majority&appName=crepeZinger"
# uri = "mongodb://localhost:27017/"

# Create a new client and connect to the server

#3mlt comment 7na boomta5
app = Flask(__name__)
CORS(app)
client = MongoClient(uri)
app.config['SECRET_KEY'] = 'r-DbyQUte22QfwuUYTY0KQ'
app.config['REFRESH_SECRET_KEY'] = 'r-DbyQUtefufnmfdusaYTY0KQ'
db=client['orthopedic-clinic']
users = db['users']
appointment=db['appointments']
images = db['images']
jwt = JWTManager(app)
# Roles=['admin','staff','patient']

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return (
        jsonify({"message": "The token has expired.", "error": "token_expired"}),
        403,
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

#a Test Route
@app.route('/', methods=['GET'])
def home():
    print('hello')

    return {
        'message': 'Hello World!'
    }

refresh_token=''
#This route is used to login a user
# TODO add logic to check hashed password
@app.route('/login', methods=['POST'])
def login():
    global refresh_token
    try:
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password').encode('utf-8')


        user = users.find_one({ 'email': email })
        if user and bcrypt.checkpw(password, user['password']):
            token = create_access_token({
			      'email': email,
            'role': user["role"]
		},expires_delta=timedelta(minutes= 60))
            refresh_token = create_refresh_token({
			      'email': email,
            'role': user["role"]
		})
            return jsonify({
                'message': 'success',
                'token': token,
                'role': user['role'],
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
    global refresh_token
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
        user = {
            'email':email,  
            'password':hashed_password,
            'phoneNumber':phone,
            'name':first_name+' '+last_name,
            'role':'patient',
            'gender': gender,
            'age':int(age),
            'address': address,
            'profilePic': ''

        }
        users.insert_one(user)
        token = create_access_token({
			      'email': email,
            'role': user["role"],
            'exp' : datetime.utcnow() + timedelta(minutes= 60)
		})
        refresh_token = create_refresh_token({
			      'email': email,
            'role': user["role"]
		})

        return jsonify({
                'message':'success',
                'token': token,
                'refresh_token': refresh_token

            })
    except Exception as e:
        return jsonify({
            'message': 'error',
            'error': str(e)
    })

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def TokenRefresh():
    current_user = get_jwt_identity()
    print(current_user)
    expires = timedelta(seconds=15)
    access_token = create_access_token(identity={'email': current_user['email'], 'role':current_user['role']}, 
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
        print(user['profilePic']==True)
        user_data = {
            'email': user['email'],
            'name': user['name'],
            'role': user['role'],
            'gender': user['gender'],
            'age': user['age'],
            'address': user['address'],
            'phoneNumber': user['phoneNumber'],
            'profilePic': user['profilePic'] 
            
        }
        
        return jsonify(user_data)

    except Exception as err:
        return jsonify({ 'error': str(err) }), 500


@app.route('/update_data', methods=['PATCH'])
@jwt_required()
def update_info():
    try: 
        data = get_jwt_identity()
        email = data['email']
        new_info = request.get_json()
        users.find_one_and_update({ 'email': email }, { '$set': new_info }, upsert=True, return_document=ReturnDocument.AFTER)


        return jsonify({ 'status': 'success' })
    except:
        return jsonify({ 'error': 'internal server error' }), 500


@app.route('/appointment_booking', methods=['POST'])
@jwt_required()
def appointment_booking():
    try:
        data=request.get_json()
        docmail=data.get('email')
        patmail=get_jwt_identity()['email']
        date=data.get('date')
        visittype=data.get('type')
        pay=data.get('paymentMethod')
        
        docid=users.find_one({'email':docmail})['_id']
        patid=users.find_one({'email':patmail})['_id']

        if appointment.find_one({'doctorId':docid,'date':date}):
            return jsonify({
                'message':'doctor is not available at this time'
            }), 409

        
        appointment.insert_one({
            'doctorId':docid,
            'patientId':patid,
            'date':date,
            'type':visittype,
            'paymentMethod':pay
        })

        return jsonify({
            'message':'success'
        })  
    except Exception as err:
        return jsonify({ 'error': str(err) }), 500


@app.route('/delete_user', methods=['DELETE'])
@jwt_required()
def delete_user():
    try:
        email = get_jwt_identity()['email']
        user = users.find_one({ 'email': email })
        
        if not user: 
            return jsonify({ 'error': 'no patient found' }), 404

        users.delete_one({'email': email})
        
        return jsonify({ 'message': 'success' })

    except Exception as err:
        return jsonify({ 'error': str(err) }), 500


if __name__ == "__main__":
    app.run(debug=True, port=8008)

