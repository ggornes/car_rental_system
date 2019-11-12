from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_cors import CORS
from sqlalchemy.dialects.mysql import INTEGER, BIGINT, CHAR, DECIMAL, DATE, DATETIME, VARCHAR, TIMESTAMP
from sqlalchemy.sql import text
from flask_marshmallow import Marshmallow
import datetime

import simplejson



# init app
app = Flask(__name__)

# API Endpoints


# Database
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'rental_db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE'] = 'rental_db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/rental_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)
mysql = MySQL(app)
CORS(app)
ma = Marshmallow(app)


# ################################################
# ######
# ######                MODELS
# ######
# ################################################
# ###### Create MySQL Tables using MySQLAlchemy
# ###############################################


# ######           Vehicle Class/Model

class Vehicles2(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	make = db.Column(VARCHAR(64), nullable=False, server_default='unknown')
	model = db.Column(VARCHAR(128), nullable=False)
	release_year = db.Column(INTEGER(display_width=4, unsigned=True, zerofill=True), nullable=False, default=1)
	registration = db.Column(VARCHAR(16), nullable=False)
	fuel = db.Column(VARCHAR(8), nullable=False, server_default='unknown')
	tank_size = db.Column(DECIMAL(precision=4, scale=1))
	initials =  db.Column(VARCHAR(4), nullable=False, server_default='xxx')
	created = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	updated = db.Column(DATETIME, server_onupdate=text('ON UPDATE CURRENT_TIMESTAMP'))
	
	# Constructor
	def __init__(self, make, model, release_year, registration, fuel, tank_size, initials):
		self.make = make
		self.model = model
		self.release_year = release_year
		self.registration = registration
		self.fuel = fuel
		self.tank_size = tank_size
		self.initials = initials
		#self.created = created
		#self.updated = updated
	
		
		
# Vehicles2 Schema
class Vehicle2Schema(ma.Schema):
	class Meta:
		fields = ('id', 'make', 'model', 'release_year', 'registration', 'fuel', 'tank_size', 'initials', 'created', 'updated')
		
# init schema
vehicle2_schema = Vehicle2Schema()
vehicles2_schema = Vehicle2Schema(many=True)





# ######           Rental Class / Model


class Rentals2(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	vehicle_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('vehicles2.id'), nullable=False)
	odometer_start = db.Column(DECIMAL(precision=9, scale=1, unsigned=True), nullable=False)
	odometer_end = db.Column(DECIMAL(precision=9, scale=1, unsigned=True), nullable=False)
	date_start = db.Column(DATETIME, nullable=False)
	date_end = db.Column(DATETIME, nullable=False)
	rental_type = db.Column(VARCHAR(1), nullable=False)
	created = db.Column(DATETIME, nullable=False, default=datetime.datetime.now())
	updated = db.Column(DATETIME, onupdate=datetime.datetime.now)
	
	
	def __init__(self, vehicle_id, odometer_start, odometer_end, date_start, date_end ):
		#self.id = id
		self.vehicle_id = vehicle_id
		self.odometer_start = odometer_start
		self.odometer_end = odometer_end
		self.date_start = date_start
		self.date_end = date_end
		self.rental_type = rental_type
		

# Rental Schema
class RentalSchema(ma.Schema):
	class Meta:
		fields = ('id', 'vehicle_id', 'odometer_start', 'odometer_end', 'date_start', 'date_end', 'rental_type', 'created', 'updated')
		
# init schema
rental2_schema = RentalSchema()
		
	
# ################################################
# ######
# ################################################






# API END POINTS

# Create a vehicle
# creates vehicle entry in the database using provided values
@app.route('/vehicle2', methods=['POST'])
def add_vehicle2():
	make = request.json['make']
	model = request.json['model']
	release_year = request.json['release_year']
	registration = request.json['registration']
	fuel = request.json['fuel']
	tank_size = request.json['tank_size']
	initials = request.json['initials']
	
	
	new_vehicle = Vehicles2(make, model, release_year, registration, fuel, tank_size, initials)
	
	db.session.add(new_vehicle)
	db.session.commit()
	
	return vehicle2_schema.jsonify(new_vehicle)

	
	
	
# Add a rental to a vehicle
# creates vehicle rental entry in the database using provided values
@app.route('/vehicle2/addrental', methods=['POST'])
def add_vehicle_rental():
	make = request.json['make']
	model = request.json['model']
	release_year = request.json['release_year']
	registration = request.json['registration']
	fuel = request.json['fuel']
	tank_size = request.json['tank_size']
	initials = request.json['initials']
	
	# ToDo:
	# Validate that data is correct;
	# Return error message
	
	
	
	new_vehicle = Vehicles2(make, model, release_year, registration, fuel, tank_size, initials)
	
	db.session.add(new_vehicle)
	db.session.commit()
	
	# ToDo:
	# Return success message
	
	return vehicle2_schema.jsonify(new_vehicle)


# Run server
if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='192.168.1.105', debug=True)
