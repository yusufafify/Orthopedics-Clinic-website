from flask import Flask, jsonify, render_template, request, g
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
import jwt
from datetime import datetime, timedelta
from functools import wraps

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

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        header = request.headers['Authorization']
        token = header.split(' ')[1]
        data = None

        if not token:
            return jsonify({ 'message': 'token is missing' }), 401
        
        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            g.user_data = data
        except:
            return jsonify({ 'message': 'invalid token' }), 

        return f(*args, **kwargs)
    
    return decorated




#This route is used to login a user
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password')
        user = users.find_one({'email': email, 'password': password})
        if user:
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


@app.route('/yarab', methods=['GET'])
@token_required
def get_user():
    try:
        return jsonify({ 'user data': g.user_data })
    
    except jwt.ExpiredSignatureError:
        return jsonify({ 'error': 'token expired' }), 401


@app.route('/personal_data', methods=['GET'])
@token_required
def get_patient_data():
    try:
        email = g.user_data['email']
        user = users.find_one({ 'email': email })
        
        print(type(user))
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





if __name__ == "__main__":
    app.run(debug=True, port=8080)

