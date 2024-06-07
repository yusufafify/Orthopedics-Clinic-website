from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import ReturnDocument
from pymongo.mongo_client import MongoClient
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import bcrypt
from bson.objectid import ObjectId
from flask_mail import Mail, Message
import secrets
uri = "mongodb://localhost:27017/"

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
app.config['MAIL_SERVER']='PUT THE EMAIL SERVER'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'PUT EMAIL'
app.config['MAIL_PASSWORD'] = 'PUT PASSWORD'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)
jwt = JWTManager(app)




#a Test Route
@app.route("/")
def index():
  return "hi there! this is the server for the orthopedic clinic app!"

@app.route('/forget_password', methods=['POST'])
def forget_password():
    try: 
        data = request.get_json()
        email = data.get('email')
        user = users.find_one({ 'email': email })
        if not user:
            return jsonify({ 'error': 'invalid email' }), 404
        
        reset_token = secrets.token_hex(16)
        expires = datetime.utcnow() + timedelta(minutes=15)

        msg = Message(subject='PASSWORD RESET LINK', sender =   'SENDER EMAIL', recipients = [email])
        msg.html = f"""<p>Click <a href="http://127.0.0.1:5500/client/forget_password/reset_password/reset.html">here</a> to reset your password</p>"""
        mail.send(msg)

        users.update_one({"_id": user["_id"]}, {"$set": {"passwordResetToken": reset_token, "passwordResetExpires": expires}})
        return jsonify({ 'message': 'success', 'reset_token': reset_token }), 200
    except Exception as err:
      
        return jsonify({ 'error': str(err) }), 500    

@app.route('/reset_password/<token>', methods=['PATCH'])
def reset_password(token):
    try: 
        data = request.get_json()
        user = users.find_one({ 'passwordResetToken': token })
        if not user: 
            return jsonify({ 'error': 'invalid token' })
        
        if datetime.utcnow() > user['passwordResetExpires']: 
            users.update_one({"_id": user["_id"]}, {"$unset": {"passwordResetToken": "", "passwordResetExpires": ""}})
            return jsonify({ 'error': 'Token expired' }), 400

        password = data.get('password').encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

        users.update_one({"_id": user["_id"]}, {"$set": {"password": hashed_password}, "$unset": {"passwordResetToken": "", "passwordResetExpires": ""}})
        return jsonify({ 'message': 'Password updated successfully' }), 200


    except Exception as err:
        return jsonify({ 'error': str(err) }), 500 

refresh_token=''
#This route is used to login a user
@app.route('/login', methods=['POST'])
def login():
    global refresh_token
    try:
        data = request.get_json()
        
        email = data.get('email').lower()
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
            }), 400
    except Exception as e:
        print("Error:", e)
        return jsonify({
            'message': 'error',
            'error': str(e)
        }), 500

#This route is used to register a new user
@app.route('/register', methods=['POST'])
def register():
    global refresh_token
    try:
        data = request.get_json()
        email=data.get('email').lower()

        user = users.find_one({ 'email': email })
        if user: 
            return jsonify({ 'error': 'email already exists choose another one' }), 409

        password=data.get('password').encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

        phone=data.get('phone')
        first_name=data.get('firstName')
        last_name=data.get('lastName')
        age=data.get('age')
        address=data.get('address')
        gender=data.get('gender')
        weight=data.get('weight')
        height=data.get('height')
        user = {
            'email':email,  
            'password':hashed_password,
            'phoneNumber':phone,
            'name':first_name+' '+last_name,
            'role':'patient',
            'gender': gender,
            'age':int(age),
            'address': address,
            'profilePic': '',
            'weight': weight,
            'height': height

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
        user_id = users.find_one({'email': email})['_id']
        print(user_id)
        return jsonify({
                'message':'success',
                'token': token,
                'refresh_token': refresh_token,
                'id': str(user_id)
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
        print('qieydqidiedh')
        if not user: 
            return jsonify({ 'error': 'no patient found' }), 404
        print(user['profilePic']==True)
        if(user['role']!='patient'):
            user_data = {
            'email': user['email'],
            'name': user['name'],
            'role': user['role'],
            'gender': user['gender'],
            'age': user['age'],
            'address': user['address'],
            'phoneNumber': user['phoneNumber'],
            'profilePic': user['profilePic'],
            'working_hours': user['working_hours'],
            'salary': user['salary'],
            'ssn': user['ssn']
            
        }
        else:
            
          user_data = {
              'email': user['email'],
              'name': user['name'],
              'role': user['role'],
              'gender': user['gender'],
              'age': user['age'],
              'address': user['address'],
              'phoneNumber': user['phoneNumber'],
              'profilePic': user['profilePic'],
              'height': user['height'],
              'weight': user['weight'] 
              
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

        if appointment.find_one({'patientId':patid,'doctorId':docid,'date':date}):
            return jsonify({
                'message':'already booked an appointment with this doctor on this date',
                'flag':False
            }), 409

        
        appointment.insert_one({
            'doctorId':docid,
            'patientId':patid,
            'date':date,
            'type':visittype,
            'paymentMethod':pay,
            'diagnosis':[],
            'treatment':[],
            'doctorNotes':'',
            'status':'pending'
        })

        return jsonify({
            'message':'success',
            'flag':True
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
        # Get user's email from JWT token
        data=request.get_json()
        user_email = get_jwt_identity()['email']

        user = users.find_one({'email': user_email})
        if not user['role'].lower() == 'admin':
            return jsonify({'message': 'NO ADMIN ACCESS'}), 404

        user_email = data.get('email')
        user_id= users.find_one({'email': user_email})['_id']
        user_role=users.find_one({'email': user_email})['role']
        if not user_id:
            return jsonify({'message': 'User not found'}), 404
        
        if user_role.lower() == 'doctor':
           users.delete_one({'email': user_email})
           appointment.delete_many({'doctorId': user_id})
           return jsonify({'message': 'Doctor and all related data have been deleted'}), 200
        else:
            users.delete_one({'email': user_email})
            appointment.delete_many({'patientId': user_id})
            medical_history.delete_many({'patientId': user_id})
            images.delete_many({'patientId': user_id})
            return jsonify({'message': 'patient and all related data have been deleted'}), 200
        
    except Exception as err:
        return jsonify({'error': str(err)}), 500





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
                    'phoneNumber':users.find_one({'_id':app['patientId']})['phoneNumber'],
                    'date':app['date'],
                    'type':app['type'],
                    'paymentMethod':app['paymentMethod']
                })

        if not arrayoftoday:
            return jsonify({
                'message':'no appointments found',
                'flag':[]
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
        patmail = get_jwt_identity()['email']
        patid = users.find_one({'email': patmail})['_id']
        flag = False
        current_date = datetime.now().date()  # Get current date
        appointments = list(appointment.find({'patientId': patid}))
        patAppointments = []
        
        for info in appointments:
            doctor_info = users.find_one({'_id': info['doctorId']})
            doctor_name = doctor_info['name'] if doctor_info else 'Unknown'
            doctor_email = doctor_info['email'] if doctor_info else 'Unknown'
            
            # Check if info['date'] is already a datetime object
            if isinstance(info['date'], datetime):
                appointment_date = info['date'].date()  # Convert to date
            else:
                
                appointment_date = datetime.strptime((info['date']), '%Y-%m-%d').date()  # Parse date string

            
            if appointment_date > current_date:
                
                flag = True
            else:
                flag = False
            
            patAppointments.append({
                'id': str(info['_id']),
                'doctor_name': doctor_name,
                'doctor_email': doctor_email,
                'date': info['date'],
                'reason': info['type'],
                'payment': info['paymentMethod'],
                'treatment': info['treatment'],
                'diagnosis': info['diagnosis'],
                'doctor_notes': info['doctorNotes'],
                'status': info['status'],
                'flag': flag
            })
        
        return jsonify(patAppointments)
    
    except Exception as e:
        return jsonify({'message': 'error', 'error': str(e)}), 400
    

@app.route('/cancel_appointment', methods=['DELETE'])
@jwt_required()
def cancel_appointment():
    try:
        user=get_jwt_identity()['email']
        userid=users.find_one({'email':user})['role']

        
        data = request.get_json()
        appointment_id = ObjectId(data.get('appointmentId'))
        appointment_info = appointment.find_one({'_id': appointment_id})
        current_date = datetime.now().date()  # Get current date

        if not appointment_info:
            return jsonify({'message': 'appointment not found','flag':False}), 404
        if isinstance(appointment_info['date'], datetime):
            appointment_date = appointment_info['date'].date()  # Convert to date
        else:
            appointment_date = datetime.strptime(appointment_info['date'], '%Y-%m-%d').date()  # Parse date string
        if(userid!='admin'):
          if appointment_date==current_date and userid=='patient':
              return jsonify({'message': 'cannot cancel an appointment on the same day','flag':False}), 400
          if appointment_date<current_date:
              return jsonify({'message': 'cannot cancel an appointment in the past','flag':False}), 400
        appointment.find_one_and_update({'_id': appointment_id}, {'$set': {'status': 'cancelled'}}, upsert=True, return_document=ReturnDocument.AFTER)
        return jsonify({'message': 'success','flag':True}), 200
    except Exception as e:
        return jsonify({'message': 'error', 'error': str(e)}), 400

@app.route('/edit_appointment', methods=['PATCH'])
@jwt_required()
def edit_appointment():
    try:
        data = request.get_json()
        patappointment = ObjectId(data.get('appointmentId'))
        appointment_info = appointment.find_one({'_id': patappointment})
        newDate=data.get('date')
        current_date = datetime.now().date()  # Get current date

        if not appointment_info:
            return jsonify({'message': 'appointment not found','flag':False}), 404
        if isinstance(appointment_info['date'], datetime):
            appointment_date = appointment_info['date'].date()  # Convert to date
        else:
            appointment_date = datetime.strptime(appointment_info['date'], '%Y-%m-%d').date()  # Parse date string
        if(isinstance(newDate, datetime)): 
            newFormattedDate = newDate.date()   
        else:
            newFormattedDate = datetime.strptime(newDate, '%Y-%m-%d').date()

        if appointment_date==current_date:
            return jsonify({'message': 'cannot Edit an appointment on the same day','flag':False}), 400
        if appointment_date<current_date:
            return jsonify({'message': 'cannot Edit an appointment in the past','flag':False}), 400
        
        if newFormattedDate<current_date:
            return jsonify({'message': 'cannot Edit an appointment to a past date','flag':False}), 400
        
        appointment.find_one_and_update({'_id': patappointment}, {'$set': {'date': str(newFormattedDate)}}, upsert=True, return_document=ReturnDocument.AFTER)
        return jsonify({'message': 'success','flag':True}), 200
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
            Doctor_hours=Doctor_info['working_hours'] if Doctor_info else 'Unknown'

            serialized_appointments.append({
                'AppointmentId': str(info['_id']),
                'patientName': patient_name ,
                'doctorName': Doctor_name,
                'date': info['date'],
                'time': Doctor_hours,
                'paymentMethod': info['paymentMethod'],
                'status': info['status']

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
                if patient_appointment:
                    print(patient_appointment['_id'])
                
               
                appointment_date = patient_appointment['date'] if patient_appointment else 'Unknown'
                
                
                patients.append({
                    'PatientId': patientid,
                    'patientName': info['name'] ,
                    'patientEmail': info['email'],
                    'patientPhone': info['phoneNumber'],
                    'time': appointment_date,


                    
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
            if  info['role'] == "doctor":
                doctorid=str(info['_id'])

                doctors.append({
                    'DoctorId': doctorid,
                    'DoctorName': info['name'] ,
                    'DoctorEmail': info['email'],
                    'DoctorPhone': info['phoneNumber'],
                    'workingHours': info['working_hours'],
                    'salary': info['salary'],
                    

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
        ssn=data.get('ssn')
        phone=data.get('phone')
        salary=data.get('salary')
        working_hours=data.get('workinghours')
        user = {
            'name':name,
            'email':email.lower(),
            'password':hashed_password,
            'age':int(age),
            'role': role, 
            'gender': gender,
            'address': address,
            'ssn': ssn,
            'phoneNumber':phone,
            'salary':salary,
            'working_hours': working_hours,
            'profilePic': ''
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


@app.route('/complete_appointment', methods=['PATCH'])
@jwt_required()
def completeapp():
    try:
        data=request.get_json()
        appid=ObjectId(data.get('appointmentId'))
        diagnosis=data.get('diagnoses')
        treatment=data.get('treatments')
        notes=data.get('notes')
        rating=data.get('rating')
        title=appointment.find_one({'_id':appid})['type']
        
        current_app=appointment.find_one({'_id':appid})

        finaldiagnosis=''
        finaltreatment='\n'
        
        if not current_app:
            return jsonify({
                'message':'appointment not found',
                'flag':False
            }), 404
        
                
        appointment.find_one_and_update({'_id':appid},{'$set':{'diagnosis':diagnosis,'treatment':treatment,'doctorNotes':notes,'status':'completed','patientrating':rating}},upsert=True,return_document=ReturnDocument.AFTER)
        
        
        
        for diagnose in range(len(diagnosis)):
            finaldiagnosis+=diagnosis[diagnose]
            if diagnose!=len(diagnosis)-1:
                finaldiagnosis+=','

        for treat in range(len(treatment)):
            value=treatment[treat].split(',')
            finaltreatment+=f'Medicine: {value[0]} ,Frequency:{value[1]} ,Dosage: {value[2]}  ,Duration: {value[3]}'
            if treat!=len(treatment)-1:
                finaltreatment+=',\n'
            

        medical_history.insert_one({
            'patientId':current_app['patientId'],
            'historytype':'appointment',
            'titleofproblem':title,
            'dateofproblem':current_app['date'],
            'description':f'Diagnosis: {finaldiagnosis} \nTreatment: {finaltreatment} \nDoctor Notes: {notes}'
        }) 
        
        return jsonify({
            'message':'success',
            'flag':True
        }), 200

    except:
        return jsonify({ 'error': 'internal server error' }), 500  



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



@app.route('/get_lifetime_doctor_appointments', methods=['GET'])
@jwt_required()
def get_lifetime_doctor():
    try:
        docmail=get_jwt_identity()['email']
        docid=users.find_one({'email':docmail})['_id']
        all_appointments=appointment.find({'doctorId':docid})

        lifetimeappointments=[]
        for app in all_appointments:
            lifetimeappointments.append({
                'patientId':str(app['patientId']),
                'appointmentID':str(app['_id']),
                'patientName':users.find_one({'_id':app['patientId']})['name'],
                'patientAge':users.find_one({'_id':app['patientId']})['age'],
                'gender':users.find_one({'_id':app['patientId']})['gender'],
                'date':app['date'],
                'type':app['type'],
                'paymentMethod':app['paymentMethod'],
                'treatment':app['treatment'],
                'diagnosis':app['diagnosis'],
                'doctorNotes':app['doctorNotes'],
                'status':app['status']
            })

        if not lifetimeappointments:
            return jsonify({
                'message':'no appointments found'
            }), 404
        
        return jsonify({'message':'done','flag':True,'lifetimeappointments':lifetimeappointments})



    except Exception as err:
        return jsonify({ 'error': str(err) }), 500

        
@app.route('/get_lifetime_doctor_patients', methods=['GET'])
@jwt_required()
def get_lifetime_doctor_patient():
    try:
        docemail=get_jwt_identity()['email']
        docid=users.find_one({'email':docemail})['_id']
        docappointments=appointment.find({'doctorId':docid})


        patientIds=[]

        for app in docappointments:
            patientIds.append(app['patientId'])


        already_added=[]
        patients=[]
        imagesArray=[]
        medical_history_array=[]
        return_images=[]
        return_history=[]

        for patid in patientIds:
            patient=users.find_one({'_id':patid})
            

            if not patient:
                continue

            if str(patid) in already_added:
                continue

            patients.append({
                'patientId':str(patid),
                'name':patient['name'],
                'email':patient['email'],
                'phoneNumber':patient['phoneNumber'],
                'address':patient['address'],
                'age':patient['age'],
                'gender':patient['gender']}),
                
            

            image=images.find({'patientId':patid})
            if not image:
                return_images.append([])
            else:
                for img in image:
                    imagesArray.append({
                        'image_id':str(img['_id']),
                        'category':img['imageType'],
                        'src':img['src'],
                        'date':img['date']
                    })
                return_images.append(imagesArray)
            

            history=medical_history.find({'patientId':patid})
            if not history:
                return_history.append([])
            else:
                for h in history:
                    medical_history_array.append({
                        'historyType':h['historytype'],
                        'title':h['titleofproblem'],
                        'date':h['dateofproblem'],
                        'description':h['description']
                    })
                return_history.append(medical_history_array)

            already_added.append(str(patid))
            imagesArray=[]
            medical_history_array=[]

        if not patients:
            return jsonify({
                'message':'no patients found'
            }), 404
        

        return jsonify({
                'message':'success',
                'patients':patients,
                'images':return_images,
                'medical_history':return_history

            }), 200


    except Exception as err:
        return jsonify({ 'error': str(err) }), 500


@app.route('/check_token_validity', methods=['GET'])
@jwt_required()
def check_token_validity():
    return jsonify({'message': 'valid'}), 200















@app.route('/get_available_doctor', methods=['POST'])
@jwt_required()
def get_available_doctor():
    try:
        data = request.get_json()
        date=data.get('date')
        max_appointments = 10  # Arbitrary constant
        returndoc = []
        today=datetime.now().date()  # Get current date
        
        if isinstance(date, datetime):
            date = date.date()  # Convert to date
        else:
            date = datetime.strptime(date, '%Y-%m-%d').date()
        
        if date<today:
            return jsonify({'message': 'cannot book an appointment in the past','flag':False}), 400

        # Get all doctors
        all_doctors = users.find({ 'role': 'doctor' })
        for doctor in all_doctors:
            # Count appointments for this doctor on the given date
            appointment_count = appointment.count_documents({ 'doctorId': doctor['_id'], 'date': str(date) })

            # If the count is less than max_appointments, add the doctor to the result
            if appointment_count < max_appointments:
                returndoc.append({
                    'DoctorName': doctor['name'],
                    'DoctorEmail': doctor['email'],
                    'DoctorPhone': doctor['phoneNumber'],
                    'doctorhours': doctor['working_hours']
                })


        if returndoc:
            return jsonify({
                'returned_doctors': returndoc,
                'flag':True,
            }), 200
        else:
            return jsonify({'message': 'no available doctors at this date','returned_doctors':[],'flag':True}), 404

        
    except Exception as err:
        print(err)
        return jsonify({ 'error': str(err) }), 500
    




@app.route('/get_number_of_app_per_month', methods=['GET'])
@jwt_required()
def get_number_of_app_per_month():
    try:
        user=get_jwt_identity()['email']
        userid=users.find_one({'email':user})['_id']
        all_appointments=appointment.find({'patientId':userid,'status':'completed'})
        returndict={'JAN':0,'FEB':0,'MAR':0,'APR':0,'MAY':0,'JUN':0,'JUL':0,'AUG':0,'SEP':0,'OCT':0,'NOV':0,'DEC':0}
        arrayofmonths=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
        for app in all_appointments:
            date=app['date']
            month=date.split('-')[1]
            returndict[arrayofmonths[int(month)-1]]+=1

        return jsonify(returndict), 200

    except Exception as err:
        return jsonify({ 'error': str(err) }), 500
    


@app.route('/get_Avg_rating', methods=['GET'])
@jwt_required()
def get_Avg_rating():
    try:
        user=get_jwt_identity()['email']
        userid=users.find_one({'email':user})['_id']
        all_appointments=appointment.find({'patientId':userid,'status':'completed'})
        returndict={'JAN':0,'FEB':0,'MAR':0,'APR':0,'MAY':0,'JUN':0,'JUL':0,'AUG':0,'SEP':0,'OCT':0,'NOV':0,'DEC':0}
        arrayofmonths=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
        arrayofratings=[0,0,0,0,0,0,0,0,0,0,0,0]
        for app in all_appointments:
            date=app['date']
            month=date.split('-')[1]
            returndict[arrayofmonths[int(month)-1]]+=int(app['patientrating'])
            arrayofratings[int(month)-1]+=1

        for i in range(12):
            if arrayofratings[i]!=0:
                returndict[arrayofmonths[i]]/=arrayofratings[i]    

        
        return jsonify(returndict), 200
    
    except Exception as err:
        return jsonify({ 'error': str(err) }), 500
    



@app.route('/get_count_of_allapps', methods=['GET'])
@jwt_required()
def get_count_of_allapps():
    try:
        countpending=appointment.count_documents({'status':'pending'}) 
        countcompleted=appointment.count_documents({'status':'completed'})   
        countcancelled=appointment.count_documents({'status':'cancelled'})

        return jsonify({'pending':countpending,'completed':countcompleted,'cancelled':countcancelled}), 200
    except Exception as e:
        return jsonify({
            'message': 'error',
            'error': str(e)
    })
# batal 3atah




@app.route('/Dashboard', methods=['GET'])
def dashboard():
    try:
       User = list(users.find()) 
       app=list(appointment.find())

       Total = []
       doctors=0
       patients=0
       examinations=0
       consultations=0
       follow_up=0
       revenue=0
       revenuec=0
       revenuee=0
       week_appointments=[]
       monthly_counts = {}
       
       for info in User:
            if info['role'].lower() == "patient":
                patients += 1
            elif info['role'].lower() == "doctor":
                doctors += 1
        # Process each appointment
       for ap in app:
            date_str = ap['date']
            year, month, day = date_str.split('-')
            year = int(year)
            month = int(month)
            day = int(day)
            appointment_type = ap['type']
            appointment_status=ap['status']
            if ap['type'].lower()=="consultation":
               consultations += 1
            if ap['type'].lower()=="consultation" and ap['status']=="completed":
                revenuec+=1
            if ap['type'].lower()=="examination":
                examinations += 1
            if ap['type'].lower()=="examination" and ap['status']=="completed":
                revenuee+=1
            if ap['type']=="Follow-Up":
                follow_up += 1
          

            current_date = datetime.now()
            appointment_date = datetime(year, month, day)
            difference = current_date - appointment_date

# Check if the difference is less than or equal to 7 days
            if difference <= timedelta(days=7):
               patient_info = users.find_one({'_id': ObjectId(ap['patientId'])})
               patient_name = patient_info['name'] if patient_info else 'Unknown'
               Doctor_info=users.find_one({'_id': ObjectId(ap['doctorId'])})
               Doctor_name = Doctor_info['name'] if Doctor_info else 'Unknown'
               week_appointments.append({
                "AppointmentId": str(ap['_id']),
                "patientName": patient_name,  
                "doctorName": Doctor_name, 
                "date": ap['date'],
                "paymentMethod": ap['paymentMethod'],  # Use get() to handle missing key
                "status": ap['status']
            })
            # Create a key for the year and month
            key = (year, month)
            
            if key not in monthly_counts:
                monthly_counts[key] = {'examinations': 0, 'consultations': 0,'Follow-Up':0,'revenuee': 0, 'revenuec': 0}
            
            # Increment the count for the appropriate type
            if appointment_type == 'Examination':
                monthly_counts[key]['examinations'] += 1
            if appointment_type == 'Examination' and appointment_status=='completed':
                monthly_counts[key]['revenuee'] += 1
            elif appointment_type.lower() == 'consultation':
                monthly_counts[key]['consultations'] += 1
            if appointment_type == 'Consultation' and appointment_status=='completed':
                monthly_counts[key]['revenuec'] += 1
            elif appointment_type == 'Follow-Up':
                monthly_counts[key]['Follow-Up'] += 1

        # Initialize a list of 24 zeros (2 for each month)
            result = [0] * 12
            result2=[0]*12

        # Fill the result list with the counts
       for (year, month), counts in monthly_counts.items():
            index = month - 1
            result[index] = counts['examinations']+counts['consultations']+counts['Follow-Up']
            result2[index] = (counts['revenuec']*300)+(counts['revenuee']*500)
            
               
        
       one_week_ago = datetime.now() - timedelta(days=7)
       one_week_ago = one_week_ago + timedelta(days=1)
       one_month_ago=datetime.now() - timedelta(days=30)
       one_month_ago = one_month_ago + timedelta(days=1)
       total_appointments = appointment.count_documents({"date": {"$gte": one_month_ago}})
       revenue= (300*revenuec)+(500*revenuee)
       

        
       response = {
            "Total": [
                {
                    "appointments": examinations+consultations+follow_up,
                    "doctors": doctors,
                    "patients": patients,
                    "revenue": revenue
                }
            ],
            "recent_appointments": week_appointments,
            "monthly_appointments":result,
            "monthly_revenue":result2
        }

       return jsonify(response), 200
    
    except Exception as err:
        return jsonify({'error': str(err)}), 500


@app.route('/edit_doctor', methods=['PATCH'])
@jwt_required()
def edit_doctor():
    try:
     if((get_jwt_identity()['role'])=="admin"):
        data = request.get_json()
        doctor_id = ObjectId(data.get('_id'))
        update_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'phoneNumber': data.get('phone'),
            'salary':data.get('salary'),
            'working_hours':data.get('working_hours')
        }
        if not doctor_id:
            return jsonify({"error": "DoctorId is required"}), 400

        doctor_object_id = ObjectId(doctor_id)

        data.pop('DoctorId', None)

        result = users.update_one(
            {"_id": doctor_object_id},
            {"$set": update_data}
        )

        if result.modified_count == 1:
            return jsonify({"message": "Doctor information updated successfully"})
        else:
            return jsonify({"message": "No doctor information updated"})
     else:
         return jsonify({"message": "You are not an authorized user"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400



@app.route('/edit_appointment_admin', methods=['PATCH'])
@jwt_required()
def edit_appointment_admin():
    try:
      if((get_jwt_identity()['role'])=="admin"):
        data = request.get_json()
        appointment_id = ObjectId(data.get('_id'))
        update_data = {
            'date': data.get('date'),
            'paymentMethod': data.get('paymentMethod'),
            'status': data.get('status')
        }
        if not appointment_id:
            return jsonify({"error": "AppointmentId is required"}), 400

        appointment_object_id = ObjectId(appointment_id)

        data.pop('AppointmentId', None)

        result = appointment.update_one(
            {"_id": appointment_object_id},
            {"$set": update_data}
        )

        if result.modified_count == 1:
            return jsonify({"message": "Appointment information updated successfully"})
        else:
            return jsonify({"message": "No Appointment information updated"})
      else:
         return jsonify({"message": "You are not an authorized user"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400



@app.route('/edit_patient', methods=['PATCH'])
@jwt_required()
def edit_patient():
    try:
     if((get_jwt_identity()['role'])=="admin"):
        data = request.get_json()
        patient_id = ObjectId(data.get('_id'))
        update_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'phoneNumber': data.get('phone')
        }
        if not patient_id:
            return jsonify({"error": "PatientId is required"}), 400

        patient_object_id = ObjectId(patient_id)

        data.pop('PatientId', None)

        result = users.update_one(
            {"_id": patient_object_id},
            {"$set": update_data}
        )

        if result.modified_count == 1:
            return jsonify({"message": "Patient information updated successfully"})
        else:
            return jsonify({"message": "No Patient information updated"})
     else:
         return jsonify({"message": "You are not an authorized user"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400



if __name__ == "__main__":
    app.run(debug=True, port=8008)

