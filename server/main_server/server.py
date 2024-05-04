from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import ReturnDocument
from pymongo.mongo_client import MongoClient
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import bcrypt
from bson.objectid import ObjectId
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
medical_history=db['medicalhistories']
images = db['images']
jwt = JWTManager(app)
# Roles=['admin','staff','patient']



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
            print(user['role'])
            return jsonify({
                'message': 'success',
                'id': str(user['_id']),
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




@app.route('/add_to_medical_history', methods=['POST'])
@jwt_required()
def add_to_medical_history():
    try:
        data=request.get_json()
        patmail=get_jwt_identity()['email']


        if not users.find_one({'email':patmail}):
            return jsonify({
                'message':'patient not found'
            }), 404


        patID=users.find_one({'email':patmail})['_id']
        htype=data.get('historytype')
        htitle=data.get('titleofproblem')
        hdate=data.get('dateofproblem')
        hdesc=data.get('description')
        medical_history.insert_one({
            'patientId':patID,
            'historytype':htype,
            'titleofproblem':htitle,
            'dateofproblem':hdate,
            'description':hdesc
        })

        return jsonify({
            'message':'success'
        })  



    except Exception as err:
        return jsonify({ 'error': str(err) }), 500




@app.route('/add_medical_image', methods=['POST'])
@jwt_required()
def addImage():
    try:
        data=request.get_json()
        patmail=get_jwt_identity()['email']
        patid=users.find_one({'email':patmail})['_id']
        imageType=data.get('imageType')
        src=data.get('src')
        date=data.get('date')
        createdAt=data.get('createdAt')
        updatedAt=data.get('updadtedAt')

        images.insert_one({
            'patientId':patid,
            'imageType':imageType,
            'src':src,
            'date':date,
            'createdAt':createdAt,
            'updatedAt':updatedAt
        })
        return jsonify({'message':'success'}),200

    except Exception as err:
        return jsonify({ 'error': str(err) }), 500


@app.route('/get_medical_history', methods=['GET'])
@jwt_required()
def getmedicalhistory():
    try:
        patemail=get_jwt_identity()['email']
        patid=users.find_one({'email':patemail})['_id']
        history=medical_history.find({'patientId':patid})

        if not history:
            return jsonify({
                'message':'no history found'
            }), 404
        
        history_list=[]
        for h in history:
            history_list.append({
                "history_id":str(h['_id']), 
                'historyType':h['historytype'],
                'title':h['titleofproblem'],
                'date':h['dateofproblem'],
                'description':h['description']
            })

        return jsonify(history_list)

    except Exception as err:
        return jsonify({ 'error': str(err) }), 500



@app.route('/medical_images', methods=['POST'])
@jwt_required()
def getMedicalImages():
    try:
        data=request.get_json()
        category=data.get('category')
        print(category)
        patmail=get_jwt_identity()['email']
        patid=users.find_one({'email':patmail})['_id']
        imagesArray=images.find({'patientId':patid})
        if not imagesArray:
            return jsonify({
                'message':'no images found'
            }), 404
        
        return_images=[]

        for image in imagesArray:
            if category.lower()=='all':
                return_images.append({
                    'image_id':str(image['_id']),
                    'category':image['imageType'],
                    'src':image['src'],
                    'date':image['date'],
                    'create':image['createdAt']
                })
            elif category.lower() in image['imageType'].lower():
                return_images.append({
                    'image_id':str(image['_id']),
                    'category':image['imageType'],
                    'src':image['src'],
                    'date':image['date'],
                    'create':image['createdAt']
                })


        
        return jsonify(return_images)

    except Exception as err:
        return jsonify({ 'error': str(err) }), 500




@app.route('/delete_medical_image', methods=['DELETE'])
@jwt_required()
def deleteImage():
    try:
        data=request.get_json()
        image_id=data.get('image_id')
        patmail=get_jwt_identity()['email']
        patid=users.find_one({'email':patmail})['_id']

        imagesarray=images.find({'patientId':patid})
        if not imagesarray:
            return jsonify({
                'message':'no images found'
            }), 404
        
        for image in imagesarray:
            if str(image['_id'])==image_id:
                images.delete_one({'_id':image['_id']})
                return jsonify({
                    'message':'success'
                }),200
            
        return jsonify({'message':'image not found'}),404

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
    





@app.route('/get_today_appointments', methods=['GET'])
@jwt_required()
def today_appointments():
    try:
        docmail=get_jwt_identity()['email']
        docid=users.find_one({'email':docmail})['_id']
        today=datetime.now().strftime('%Y-%m-%d')
        appointments=appointment.find({'doctorId':docid})
        
        arrayoftoday=[]
        
        for app in appointments:
            if app['status']=='pending' and str(today) in str(app['date']):
                arrayoftoday.append({
                    'patientId':str(app['patientId']),
                    'appointmentID':str(app['_id']),
                    'patientName':users.find_one({'_id':app['patientId']})['name'],
                    'patientAge':users.find_one({'_id':app['patientId']})['age'],
                    'date':app['date'],
                    'type':app['type'],
                    'paymentMethod':app['paymentMethod']
                })

        if not arrayoftoday:
            return jsonify({
                'message':'no appointments found'
            }), 404
        
        return jsonify(arrayoftoday)
        
    except Exception as err:
        return jsonify({ 'error': str(err) }), 500
    



@app.route('/get_patient_info', methods=['POST'])
@jwt_required()
def get_patient_info():
    try:
        data=request.get_json()
        patid=ObjectId(data.get('patientId'))
        user=users.find_one({'_id':patid})
        if not user:
            return jsonify({
                'message':'patient not found'
            }), 404

        return_user={
            "patienId":str(user['_id']),
            "email":user['email'],
            "phoneNumber":user['phoneNumber'],
            "address":user['address'],
            "age":user['age'],
            "name":user['name'],
            "role":user['role'],
            "gender":user['gender']
        }
            

        imagesArray=images.find({'patientId':patid})
        return_images=[]

        for image in imagesArray:
            return_images.append({
                'image_id':str(image['_id']),
                'category':image['imageType'],
                'src':image['src'],
                'date':image['date']
            })

        medical_history_array=medical_history.find({'patientId':patid})
        history_list=[]
        for history in medical_history_array:
            history_list.append({
                'historyType':history['historytype'],
                'title':history['titleofproblem'],
                'date':history['dateofproblem'],
                'description':history['description']
            })


    
        if not return_images and not history_list:
            return jsonify({
                'message':'no images & history found',
                'user':return_user
            }), 200
        elif not return_images:
            return jsonify({
                'message':'no images found',
                'user':return_user,
                'medical_history':history_list
            }), 200
        elif not history_list:
            return jsonify({
                'message':'no history found',
                'user':return_user,
                'images':return_images
            }), 200
        return jsonify({
                'message':'success',
                'user':return_user,
                'images':return_images,
                'medical_history':history_list

            }), 200
        
    except Exception as err:
        return jsonify({ 'error': str(err) }), 500
    


@app.route('/all_appointments', methods=['GET'])
@jwt_required()
def all_appointments():
    try:
        docmail=get_jwt_identity()['email']
        docid=users.find_one({'email':docmail})['_id']
        appointments=appointment.find({'doctorId':docid})
        arrayofall=[]
        
        for app in appointments:
            arrayofall.append({
                'patientId':str(app['patientId']),
                'appointmentID':str(app['_id']), #changed from 'appointmentId' to 'appointmentID
                'patientName':users.find_one({'_id':app['patientId']})['name'],
                'patientAge':users.find_one({'_id':app['patientId']})['age'],
                'date':app['date'],
                'type':app['type'],
                'paymentMethod':app['paymentMethod'],
                'treatment':app['treatment'],
                'diagnosis':app['diagnosis'],
                'doctorNotes':app['doctorNotes'],
                'status':app['status']
            })

        if not arrayofall:
            return jsonify({
                'message':'no appointments found'
            }), 404
        
        return jsonify(arrayofall)


    except Exception as err:
        return jsonify({ 'error': str(err) }), 500    


@app.route('/get_patient_appointments', methods=['GET'])
@jwt_required()
def get_patient_appointments():
    try:
        patmail=get_jwt_identity()['email']
        patid=users.find_one({'email':patmail})['_id']
        print
        appointments=list(appointment.find({'patientId':patid}))
        patAppointments=[]
        for info in appointments:
            doctor_info=users.find_one({'_id':info['doctorId']})
            doctor_name=doctor_info['name'] if doctor_info else 'Unknown'
            doctor_email=doctor_info['email'] if doctor_info else 'Unknown'

            patAppointments.append({
                'id':str(info['_id']),
                'doctor_name':doctor_name,
                'doctor_email':doctor_email,
                'date':info['date'],
                'reason':info['type'],
                'payment':info['paymentMethod'],
                'treatment':info['treatment'],
                'diagnosis':info['diagnosis'],
                'doctor_notes':info['doctorNotes'],
                'status':info['status']
            })
        return jsonify(patAppointments)
    except Exception as e:
        return jsonify({'message': 'error', 'error': str(e)}), 400

#Admin Endpoints
@app.route('/get_appointments', methods=['GET'])
def get_appointments():
    try:
        app = list(appointment.find()) 

        serialized_appointments = []
        for info in app:

            patient_info = users.find_one({'_id': ObjectId(info['patientId'])})
            print(patient_info)
            print("############")

            print(ObjectId(info['patientId']))
            patient_name = patient_info['name'] if patient_info else 'Unknown'
            Doctor_info=users.find_one({'_id': ObjectId(info['doctorId'])})
            Doctor_name = Doctor_info['name'] if Doctor_info else 'Unknown'

            serialized_appointments.append({
                'AppointmentId': str(info['_id']),
                'patientName': patient_name ,
                'doctorName': Doctor_name,
                'date': info['date'].strftime('%Y-%m-%d'),
                'time': info['date'].strftime('%H:%M:%S'),
                'paymentMethod': info['paymentMethod']

            })
        for info in serialized_appointments:
            print(info)
        return jsonify(serialized_appointments)
    except Exception as e:
        return jsonify({'message': 'error', 'error': str(e)}), 400
    



@app.route('/get_patients', methods=['GET'])
def get_patients():
    try:
        User = list(users.find()) 

        patients = []
        for info in User:
            if info['role'] == "Patient" or info['role'] == "patient":
                patientid=str(info['_id'])
                patient_appointment = appointment.find_one({'patientId': ObjectId(info['_id'])})
                print(patient_appointment)
                appointment_date = patient_appointment['date'].strftime('%Y-%m-%d') if patient_appointment else 'Unknown'

                patients.append({
                    'PatientId': patientid,
                    'patientName': info['name'] ,
                    'patientEmail': info['email'],
                    'patientPhone': info['phoneNumber'],
                    'time': appointment_date
                    
              })
        for info in patients:
            print(info)
        return jsonify(patients)
    except Exception as e:
        return jsonify({'message': 'error', 'error': str(e)}), 400
    


@app.route('/get_doctors', methods=['GET'])
def get_doctors():
    try:
        User = list(users.find()) 

        doctors = []
        for info in User:
            if info['role'] == "Doctor" or info['role'] == "doctor":
                doctorid=str(info['_id'])

                doctors.append({
                    'DoctorId': doctorid,
                    'DoctorName': info['name'] ,
                    'DoctorEmail': info['email'],
                    'DoctorPhone': info['phoneNumber']

                })
        for info in doctors:
            print(info)
        return jsonify(doctors)
    except Exception as e:
        return jsonify({'message': 'error', 'error': str(e)}), 400
    








@app.route('/create_employee', methods=['POST'])
def create_employee():
    global refresh_token
    try:
        data = request.get_json()
        email=data.get('email')

        user = users.find_one({ 'email': email })
        if user: 
            return jsonify({ 'error': 'invalid email' }), 409

        password=data.get('password').encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

        name=data.get('name')
        age=data.get('age')
        role=data.get('role')
        gender=data.get('gender')
        address=data.get('address')
        #ssn=data.get('ssn')
        phone=data.get('phone')
        #salary=data.get('salary')
        #working_hours=data.get('workingHours')
        user = {
            'name':name,
            'email':email,
            'password':hashed_password,
            'age':int(age),
            'role': role, 
            'gender': gender,
            'address': address,
            #'ssn': ssn,
            'phoneNumber':phone,
            #'salary':salary,
            #'working_hours': working_hours
        }
        users.insert_one(user)
        token = create_access_token({
                  'email': email,
            'role': user["role"],
            'exp' : datetime.utcnow() + timedelta(seconds= 15)
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

#route to delete a history
@app.route('/delete_history', methods=['DELETE'])
@jwt_required()
def delete_history():
    try:
        data=request.get_json()
        history_id=ObjectId(data.get('history_id'))
        patmail=get_jwt_identity()['email']
        patid=users.find_one({'email':patmail})['_id']
        history=medical_history.find_one({'_id':history_id})
        if not history:
            return jsonify({
                'message':'history not found'
            }), 404
        if history['patientId']!=patid:
            return jsonify({
                'message':'unauthorized'
            }), 401
        medical_history.delete_one({'_id':history_id})
        return jsonify({
            'message':'success'
        }), 200

    except Exception as err:
        return jsonify({ 'error': str(err) }), 500



if __name__ == "__main__":
    app.run(debug=True, port=8008)

