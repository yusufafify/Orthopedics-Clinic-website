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
app.config['SECRET_KEY'] = '42069sexweed'
db=client['orthopedic-clinic']
users = db['users']
# Roles=['admin','staff','patient']

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
			current_user = users.find_one({'email': data['email']})
		except:
			return jsonify({
				'message' : 'Token is invalid !!'
			}), 401
		# returns the current logged in users context to the routes
		return f(current_user, *args, **kwargs)

	return decorated

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
            token = jwt.encode({
			'email': user["email"],
            'role': user["role"],
			'exp' : datetime.utcnow() + timedelta(minutes = 30)
		}, app.config['SECRET_KEY'])
            return jsonify({
                'message': 'success',
                'token': token,
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

