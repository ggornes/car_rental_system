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
app.config['MYSQL_DB'] = 'rental_db_2'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE'] = 'rental_db_2'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/rental_db_2'
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


# ################################################
# ######     Vehicle Class/Model
# ################################################


class Vehicles(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	make = db.Column(VARCHAR(64), nullable=False, server_default='unknown')
	model = db.Column(VARCHAR(128), nullable=False)
	release_year = db.Column(INTEGER(display_width=4, unsigned=True, zerofill=True), nullable=False, server_default=text('1'))
	registration = db.Column(VARCHAR(16), nullable=False)
	fuel = db.Column(VARCHAR(8), nullable=False, server_default='unknown')
	tank_size = db.Column(DECIMAL(precision=4, scale=1, unsigned=True))
	initials =  db.Column(VARCHAR(4), nullable=False, server_default='xxx')
	created = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	updated = db.Column(DATETIME, server_default=text('NULL ON UPDATE CURRENT_TIMESTAMP'))
	
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
class VehicleSchema(ma.Schema):
	class Meta:
		fields = ('id', 'make', 'model', 'release_year', 'registration', 'fuel', 'tank_size', 'initials', 'created', 'updated')
		
# init schema
vehicle_schema = VehicleSchema()
vehicles_schema = VehicleSchema(many=True)




# ################################################
# ######     Rental Class / Model
# ################################################



class Rentals(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	vehicle_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('vehicles.id'), nullable=False, server_default=text('0'))
	odometer_start = db.Column(DECIMAL(precision=9, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	odometer_end = db.Column(DECIMAL(precision=9, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	date_start = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	date_end = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	rental_type = db.Column(VARCHAR(1), nullable=False)
	created = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	updated = db.Column(DATETIME, server_default=text('NULL ON UPDATE CURRENT_TIMESTAMP'))
	
	
	def __init__(self, vehicle_id, odometer_start, odometer_end, date_start, date_end, rental_type ):
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
rental_schema = RentalSchema()


# ################################################
# ######     Fuel_Purchase Class / Model
# ################################################

class Fuel_purchases(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	vehicle_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('vehicles.id'), nullable=False, server_default=text('0'))
	rental_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('rentals.id'), nullable=False, server_default=text('0'))
	amount = db.Column(DECIMAL(precision=4, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	cost = db.Column(DECIMAL(precision=4, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	created = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	updated = db.Column(DATETIME, server_default=text('NULL ON UPDATE CURRENT_TIMESTAMP'))
	
	def __init__(self, vehicle_id, rental_id, amount, cost, created, updated):
		self.vehicle_id = vehicle_id
		self.rental_id = rental_id
		self.amount = amount
		self.cost = cost
		self.created = created
		self.updated = updated
		
class Fuel_PurchaseSchema(ma.Schema):
	class Meta:
		fields = ('id', 'vehicle_id', 'rental_id', 'amount', 'cost', 'created', 'updated')

#init schema
fuel_purchases_schema = Fuel_PurchaseSchema()


# ################################################
# ######     Service Class / Model
# ################################################

class Services(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	vehicle_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('vehicles.id'), nullable=False, server_default=text('0'))
	odometer = db.Column(DECIMAL(precision=9, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	serviced_at = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	created = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	updated = db.Column(DATETIME, server_default=text('NULL ON UPDATE CURRENT_TIMESTAMP'))
	
	def __init__(self, vehicle_id, odometer, serviced_at, created, updated):
		self.vehicle_id = vehicle_id
		self.odometer = odometer
		self.serviced_at = serviced_at
		self.created = created
		self.updated = updated

class ServicesSchema(ma.Schema):
	class Meta:
		fields = ('id', 'vehicle_id', 'odometer', 'serviced_at', 'created', 'updated')
		
#init schema
services_schema = ServicesSchema()
	
# ################################################
# ######         END of classes / Models
# ################################################








# ################################################
# ######
# ######            API END POINTS
# ######
# ################################################

# ################################################
# ######             GET Methods
# ###############################################


# ################################################
# ######     get all vehicles from vehicles table
# ################################################ 

@app.route('/vehicles/show', methods=['GET'])
def get_all_vehicles():
	all_vehicles = Vehicles.query.all()
	result = vehicles_schema.dump(all_vehicles)
	return jsonify(result) # Note: returns an array of objects
	

# ################################################
# ###### get a single vehicle from vehicles table
# ################################################ 

@app.route('/vehicles/show/<id>', methods=['GET'])
def get_vehicle(id):
	vehicle = Vehicles.query.get(id)
	#result = vehicles_schema.dump(vehicle)
	#return jsonify(result)
	return (vehicle_schema.jsonify(vehicle)) # Note: returns a single object 
	
	
# ################################################
# ###### get all rentals for certain vehicle
# ################################################
# Needs a review
# ################################################
	
#@app.route('/vehicles/rentals/<id>', methods=['GET'])
#def get_rentals_by_vehicle_id(id):
#	rentals = Rentals.query(Vehicles, Rentals).join(Rentals).get(id)
#	print(rentals)
#	return rental_schema.jsonify(rentals)
	
	
@app.route('/vehicles/rentals/<id>', methods=['GET'])
def get_rentals_by_vehicle_id(id):
	# rentals list
	cur = mysql.connection.cursor()
	cur.execute(" SELECT date_format(date_start, '%Y-%m-%d') as date_start, CAST((odometer_end - odometer_start) as CHAR) distance, date_format(date_end, '%Y-%m-%d') as date_end, rental_type, CAST(IF(rental_type='D', 100, odometer_end - odometer_start) as CHAR) as rental_cost from rentals where vehicle_id = " + id)
	rv = cur.fetchall()
	
	#rentals summary
	cur.execute("SELECT COUNT(*) as total_rentals, CAST(SUM(distance) as CHAR) as total_distance, CAST(SUM(rental_cost) as CHAR) as total_cost FROM (SELECT id, vehicle_id, CAST(odometer_start as CHAR) as odometer_start, CAST(odometer_end as CHAR) odometer_end, (odometer_end - odometer_start) as distance, date_start, date_end, rental_type, IF(rental_type='D', 100, odometer_end - odometer_start) as rental_cost, created updated FROM rentals WHERE vehicle_id = " + id + ") as rentals_summary")
	rv2 = cur.fetchall()
	return jsonify(rv, rv2)
	
	

# ################################################
# ###### get all services for certain vehicle
# ################################################
# Needs a review
# ################################################
	
@app.route('/vehicles/services/<id>', methods=['GET'])
def get_services_by_vehicle_id(id):
	cur = mysql.connection.cursor()
	cur.execute(" SELECT date_format(created, '%Y-%m-%d') as created, CAST(odometer as CHAR) as odometer FROM services WHERE vehicle_id = " + id)
	rv = cur.fetchall()
	return jsonify(rv)

	
# ################################################
# ###### get all fuel_purchases for certain vehicle
# ################################################
# Needs a review
# ################################################
	
@app.route('/vehicles/fuel_purchases/<id>', methods=['GET'])
def get_fuel_purchases_by_vehicle_id(id):
	# Fuel_purchases list
	cur = mysql.connection.cursor()
	cur.execute(" SELECT date_format(created, '%Y-%m-%d') as created, CAST(amount as CHAR) as amount, CAST(cost as CHAR) cost FROM fuel_purchases WHERE vehicle_id = " + id)
	rv = cur.fetchall()
	
	#Fuel purchases summary
	cur.execute("SELECT COUNT(*) as total_fuel_purchases, CAST(SUM(amount) as CHAR) as total_amount, CAST(SUM(cost) as CHAR) as total_cost from (SELECT id, vehicle_id, rental_id, CAST(amount as CHAR) as amount, CAST(cost as CHAR) cost, created, updated FROM fuel_purchases WHERE vehicle_id = " + id + ") as fuel_purchases_summary;")
	rv2 = cur.fetchall()
	return jsonify(rv, rv2)

	

	
	
	
# ################################################
# ######             POST Methods
# ###############################################
	
	
# ################################################
# ###### add a vehicle to the database
# ################################################ 	


@app.route('/vehicles/add', methods=['POST'])
def add_vehicle():

# get data from request
	make = request.json['make']
	model = request.json['model']
	release_year = request.json['release_year']
	registration = request.json['registration']
	fuel = request.json['fuel']
	tank_size = request.json['tank_size']
	initials = request.json['initials']
	
# instantiate the vehicle object
	new_vehicle = Vehicles(make, model, release_year, registration, fuel, tank_size, initials)
	
# add vehicle to database
	db.session.add(new_vehicle)
	db.session.commit()
	
# return message
	return vehicle_schema.jsonify(new_vehicle)

	
	

	
# ################################################
# ###### add a rental to avehicle into the database
# ################################################ 	

@app.route('/vehicles/rentals/add', methods=['POST'])
def add_vehicle_rental():
# get datga from request
	vehicle_id = request.get_json()['vehicle_id']
	odometer_start = request.get_json()['odometer_start']
	odometer_end = request.get_json()['odometer_end']
	date_start = request.get_json()['date_start']
	date_end = request.get_json()['date_end']
	rental_type = request.get_json()['rental_type']

# instantiate the vehicle object
	
	
	# ToDo:
	# Validate that data is correct;
	# Return error message
	
	new_rental = Rentals(vehicle_id, odometer_start, odometer_end, date_start, date_end, rental_type)
	

	
	db.session.add(new_rental)
	db.session.commit()
	
	# ToDo:
	# Return success message
	
	return rental_schema.jsonify(new_rental)
	
	
# ################################################
# ######             PUT Methods
# ###############################################
	
	
# ################################################
# ######   Edit vehicle
# ################################################ 	

@app.route('/vehicles/edit/<id>', methods=['PUT'])
def edit_vehicle(id):
	vehicle = Vehicles.query.get(id)

	make = request.get_json()['make']
	model = request.get_json()['model']
	release_year = request.get_json()['release_year']
	registration = request.get_json()['registration']
	fuel = request.get_json()['fuel']
	tank_size = request.get_json()['tank_size']
	initials = request.get_json()['initials']
	
	vehicle.make = make
	vehicle.model = model
	vehicle.release_year = release_year
	vehicle.registration = registration
	vehicle.fuel = fuel
	vehicle.tank_size = tank_size
	vehicle.initials = initials
	
	db.session.commit()
	return vehicle_schema.jsonify(vehicle)
	
	
	
# ################################################
# ######             DELETE Methods
# ###############################################
	
	
# ################################################
# ######   Delete vehicle
# ################################################ 
	
@app.route('/vehicles/delete/<id>', methods=['DELETE'])
def delete_vehicle(id):
	vehicle = Vehicles.query.get(id)
	db.session.delete(vehicle)
	db.session.commit()
	
	return vehicle_schema.jsonify(vehicle)


# Run server
if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='192.168.1.105', debug=True)
