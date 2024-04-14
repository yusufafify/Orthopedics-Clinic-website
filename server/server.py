from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
import jwt
from datetime import datetime, timedelta
from functools import wraps
uri = "mongodb+srv://abdullahfouad235:abdullahfouad532@crepezinger.cnpysts.mongodb.net/orthopedic-clinic?retryWrites=true&w=majority&appName=crepeZinger"

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



#This function is used to generate a token for the user
def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None
		# jwt is passed in the request header
		if 'token' in request.headers:
			token = request.headers['token']
		# return 401 if token is not passed
		if not token:
			return jsonify({'message' : 'Token is missing !!'}), 401

		try:
			# decoding the payload to fetch the stored details
			data = jwt.decode(token, app.config['SECRET_KEY'])
			current_user = users.find_one({'email': data['email'], 'role': data['role']})
		except:
			return jsonify({
				'message' : 'Token is invalid !!'
			}), 401
		# returns the current logged in users context to the routes
		return f(current_user, *args, **kwargs)

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
            print( datetime.utcnow() + timedelta(minutes = 30))
            token = jwt.encode({
			      'email': email,
            'role': user["role"],
            'exp' : datetime.utcnow() + timedelta(minutes = 0.5)
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
    

#This route is used to check if the token is valid or not
@app.route('/check_token', methods=['GET'])
def check_token():
    token = request.headers.get('token')
    if not token:
        return jsonify({'message': 'Token is missing', 'status': 401})
    
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        print('exception 1')
        return jsonify({'message': 'Token is expired', 'status': 401})
    except jwt.InvalidTokenError:
        print('exception 2')

        return jsonify({'message': 'Invalid token', 'status': 401})

    except Exception as e:
        print('exception 3')

        return jsonify({'message': 'Token is invalid'})
    if datetime.utcnow() > datetime.fromtimestamp(data['exp']):
        return jsonify({'message': 'Token is expired',  'status': 401})
    else:
        return jsonify({'message': 'Token is valid',  'status':200})




if __name__ == "__main__":
    app.run(debug=True, port=8080)

