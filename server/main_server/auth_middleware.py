from flask import request, jsonify, g, Flask
from functools import wraps
import jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'r-DbyQUte22QfwuUYTY0KQ'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            header = request.headers['Authorization']
            token = header.split(' ')[1]
        except:
            return jsonify({ 'message': 'missing token or auth header' }), 401
        
        data = None
        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            g.user_data = data
        except:
            return jsonify({ 'message': 'invalid token' }), 403

        return f(*args, **kwargs)
    
    return decorated
