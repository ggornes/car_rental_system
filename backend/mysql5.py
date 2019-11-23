from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_cors import CORS
from sqlalchemy.dialects.mysql import INTEGER, BIGINT, CHAR, DECIMAL, DATE, DATETIME, VARCHAR, TIMESTAMP
from sqlalchemy.sql import text
from flask_marshmallow import Marshmallow
import datetime

import simplejson

from sqlalchemy import table, column, func, desc


# Usefull links:
# https://blog.miguelgrinberg.com/post/nested-queries-with-sqlalchemy-orm
# https://auth0.com/blog/sqlalchemy-orm-tutorial-for-python-developers/
# https://docs.sqlalchemy.org/en/13/core/sqlelement.html#sqlalchemy.sql.expression.func



# https://stackoverflow.com/questions/32419455/how-to-sum-count-subqueries-with-sqlalchemy --> count sum etc

# https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/

# init app
app = Flask(__name__)

# API Endpoints


# Database
app.config['MYSQL_USER'] = 'rental_db_admin'
app.config['MYSQL_PASSWORD'] = 'Password1'
app.config['MYSQL_DB'] = 'rental_db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE'] = 'rental_db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://rental_db_admin:Password1@localhost/rental_db'
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

# ################################################
# ######     Rental Class / Model
# ################################################

class Rentals(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	vehicle_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('vehicles.id', ondelete='CASCADE'), nullable=False, server_default=text('0'))
	odometer_start = db.Column(DECIMAL(precision=9, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	odometer_end = db.Column(DECIMAL(precision=9, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	date_start = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	date_end = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	rental_type = db.Column(VARCHAR(1), nullable=False)
	created = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	updated = db.Column(DATETIME, server_default=text('NULL ON UPDATE CURRENT_TIMESTAMP'))
	
	
	def __init__(self, vehicle_id, odometer_start, odometer_end, date_start, date_end, rental_type ):
		self.vehicle_id = vehicle_id
		self.odometer_start = odometer_start
		self.odometer_end = odometer_end
		self.date_start = date_start
		self.date_end = date_end
		self.rental_type = rental_type

# ################################################
# ######     Fuel_Purchase Class / Model
# ################################################

class Fuel_purchases(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	vehicle_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('vehicles.id', ondelete='CASCADE'), nullable=False, server_default=text('0'))
	rental_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('rentals.id', ondelete='CASCADE'), nullable=False, server_default=text('0'))
	amount = db.Column(DECIMAL(precision=4, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	cost = db.Column(DECIMAL(precision=4, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	created = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	updated = db.Column(DATETIME, server_default=text('NULL ON UPDATE CURRENT_TIMESTAMP'))
	
	def __init__(self, vehicle_id, rental_id, amount, cost):
		self.vehicle_id = vehicle_id
		self.rental_id = rental_id
		self.amount = amount
		self.cost = cost

# ################################################
# ######     Service Class / Model
# ################################################

class Services(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	vehicle_id = db.Column(BIGINT(20, unsigned=True), db.ForeignKey('vehicles.id', ondelete='CASCADE'), nullable=False, server_default=text('0'))
	odometer = db.Column(DECIMAL(precision=9, scale=1, unsigned=True), nullable=False, server_default=text('0'))
	serviced_at = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	created = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	updated = db.Column(DATETIME, server_default=text('NULL ON UPDATE CURRENT_TIMESTAMP'))
	
	def __init__(self, vehicle_id, odometer, serviced_at):
		self.vehicle_id = vehicle_id
		self.odometer = odometer
		self.serviced_at = serviced_at



# ################################################
# ######
# ######                SCHEMAS
# ######
# ################################################
# ###### Create model Schemas using Marshmallow
# ###############################################

# ################################################
# ######     Vehicles
# ################################################

class VehicleSchema(ma.Schema):
	class Meta:
		ordered = True
		fields = ('id', 'make', 'model', 'release_year', 'registration', 'fuel', 'tank_size', 'initials', 'created', 'updated')



# ################################################
# ######     Rentals
# ################################################

class RentalSchema(ma.Schema):
	class Meta:
		ordered = True
		fields = ('id', 'vehicle_id', 'odometer_start', 'odometer_end', 'date_start', 'date_end', 'rental_type', 'created', 'updated')

class RentalSchema_more(ma.Schema):
	class Meta:
		ordered = True
		fields = ('id', 'date_start', 'odometer_start', 'odometer_end', 'distance', 'date_end', 'rental_type', 'rental_cost')
		
class RentalSchema_less(ma.Schema):
	class Meta:
		ordered = True
		fields = ('id', 'date_start', 'distance', 'date_end', 'rental_type', 'rental_cost')



# ################################################
# ######     Fuel Purchase
# ################################################

class Fuel_PurchaseSchema(ma.Schema):
	class Meta:
		ordered = True
		fields = ('created', 'amount', 'cost')
		

# ################################################
# ######     Services
# ################################################

class ServicesSchema(ma.Schema):
	class Meta:
		ordered = True
		fields = ('serviced_at', 'odometer')


# init schemas
vehicle_schema = VehicleSchema()
vehicles_schema = VehicleSchema(many=True)

rental_schema = RentalSchema()
rentals_schema = RentalSchema(many=True)

rental_schema_more = RentalSchema_more()
rentals_schema_more = RentalSchema_more(many=True)

rental_schema_less = RentalSchema_less()
rentals_schema_less = RentalSchema_less(many=True)

fuel_purchase_schema = Fuel_PurchaseSchema()
fuel_purchases_schema = Fuel_PurchaseSchema(many=True)

service_schema = ServicesSchema()
services_schema = ServicesSchema(many=True)


# ################################################
# ######
# ######            API END POINTS
# ######
# ################################################

# ################################################
# ######             GET Methods
# ###############################################


# ######     Vehicles
# ################################################

# ######     get all VEHICLES from vehicles table
@app.route('/vehicles/show', methods=['GET'])
def get_all_vehicles():
	all_vehicles = Vehicles.query.all()
	result = vehicles_schema.dump(all_vehicles)
	return jsonify(result)


# ###### get a single VEHICLE from vehicles table
@app.route('/vehicles/show/<id>', methods=['GET'])
def get_vehicle(id):
	vehicle = Vehicles.query.filter(Vehicles.id == id).all()
	return vehicles_schema.jsonify(vehicle) # returns an array of objects



# ######     Rentals
# ################################################

# ###### get all RENTALS for certain vehicle
@app.route('/vehicles/rentals/<id>', methods=['GET'])
def get_rentals_by_vehicle_id(id):

	# list of rentals
	rentals = db.session.query(Rentals.id, Rentals.date_start, Rentals.odometer_start, Rentals.odometer_end, (Rentals.odometer_end - Rentals.odometer_start).label('distance'), Rentals.date_end, Rentals.rental_type, func.IF(Rentals.rental_type == "D", (func.datediff(Rentals.date_end, Rentals.date_start)+1)*100, (Rentals.odometer_end - Rentals.odometer_start)).label('rental_cost')).filter(Rentals.vehicle_id == id).order_by(desc(Rentals.date_start)).all()
	print(rentals)
	rentals_list = rentals_schema_more.jsonify(rentals)
	
	return (rentals_list)

# ###### get RENTALS summary for a vehicle
@app.route('/vehicles/rentals/sum/<id>', methods=['GET'])
def get_rentals_sum_by_vehicle_id(id):
    # rentals summary
	rentals_summary = db.session.query(Rentals.id, Rentals.vehicle_id, (Rentals.odometer_end - Rentals.odometer_start).label('distance'), Rentals.rental_type, func.IF(Rentals.rental_type == "D", (func.datediff(Rentals.date_end, Rentals.date_start)+1)*100, (Rentals.odometer_end - Rentals.odometer_start)).label('rental_cost')).filter(Rentals.vehicle_id == id).all()

	rentals_count = 0
	rentals_distance = 0
	rentals_cost = 0

	for rental in rentals_summary:
		rentals_count += 1
		rentals_distance += rental.distance
		rentals_cost += rental.rental_cost
	
	#print(rentals_count)
	#print(rentals_distance)
	#print(rentals_cost)

	rentals_summary = {"total_rentals": rentals_count, "total_distance": rentals_distance, "total_cost": rentals_cost}
	
	return (rentals_summary)



# ######     Fuel Purchases
# ################################################

# ###### get all FUEL_PURCHASES for certain vehicle
@app.route('/vehicles/fuel_purchases/<id>', methods=['GET'])
def get_fuel_purchases_by_vehicle_id(id):

	fuel_purchases = Fuel_purchases.query.filter(Fuel_purchases.vehicle_id == id).order_by(desc(Fuel_purchases.created)).all()
	fuel_purchases_list = fuel_purchases_schema.jsonify(fuel_purchases)
	return fuel_purchases_list
	

# ###### get FUEL_PURCHASES summary for a vehicle
@app.route('/vehicles/fuel_purchases/sum/<id>', methods=['GET'])
def get_fuel_purchases_sum_by_vehicle_id(id):

	fuel_purchases = Fuel_purchases.query.filter(Fuel_purchases.vehicle_id == id).all()
	
	fuel_purchases_count = 0
	fuel_purchases_amount = 0
	fuel_purchases_cost = 0
	
	for fuel_purchase in fuel_purchases:
		fuel_purchases_count += 1
		fuel_purchases_amount += fuel_purchase.amount
		fuel_purchases_cost += fuel_purchase.cost
		
	fuel_purchases_summary = {"total_fuel_purchases": fuel_purchases_count, "total_amount": fuel_purchases_amount, "total_cost": fuel_purchases_cost}
	
	return fuel_purchases_summary




# ######     Services
# ################################################

# ###### get all SERVICES for certain vehicle
@app.route('/vehicles/services/<id>', methods=['GET'])
def get_services_by_vehicle_id(id):
	services = Services.query.filter(Services.vehicle_id == id).order_by(desc(Services.serviced_at)).all()
	services_list = services_schema.jsonify(services)
	return (services_list)


# ###### get SERVICES summary for a vehicle
@app.route('/vehicles/services/sum/<id>', methods=['GET'])
def get_services_sum_by_vehicle_id(id):
	services = Services.query.filter(Services.vehicle_id == id).all()
	
	services_count = 0
	
	for service in services:
		services_count += 1
		
	print(services_count)
	
	services_summary = {"total_services": services_count}
	
	return services_summary



# ################################################
# ######             POST Methods
# ###############################################
	
	
# ################################################
# ## 1 ## add a vehicle to the database
# ################################################ 	


@app.route('/vehicles/add', methods=['POST'])
def add_vehicle():

# get data from request
	make = request.json['make']
	model = request.json['model']
	release_year = request.json['release_year']
	registration = request.json['registration']
	try:
		fuel = request.json['fuel']
		if fuel == "":
			fuel = None
	except:
		fuel = None
	try:
		tank_size = request.json['tank_size']
		if tank_size == "":
			tank_size = None
	except:
		tank_size = None
	try:
		initials = request.json['initials']
	except:
		initials = None
	
# instantiate the vehicle object
	new_vehicle = Vehicles(make, model, release_year, registration, fuel, tank_size, initials)
	
# add vehicle to database
	db.session.add(new_vehicle)
	db.session.commit()
	
# return message
	return vehicle_schema.jsonify(new_vehicle)

	
	

	
# ################################################
# ## 2 ## add a rental to avehicle into the database
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
# ## 3 ## add a service to a vehicle
# ################################################ 	

@app.route('/vehicles/services/add', methods=['POST'])
def add_service():
# get data from request
	vehicle_id = request.get_json()['vehicle_id']
	odometer = request.get_json()['odometer']
	serviced_at = request.get_json()['serviced_at']

	
# instantiate the vehicle object
	new_service = Services(vehicle_id, odometer, serviced_at)
	
	db.session.add(new_service)
	db.session.commit()
	
	return service_schema.jsonify(new_service)
	
	
# ################################################
# ## 4 ## add a fuel purchase to a vehicle
# ################################################ 
	
@app.route('/vehicles/fuel_purchase/add', methods=['POST'])
def add_fuel_purchase():
# get data from request

	vehicle_id = request.get_json()['vehicle_id']
	rental_id = request.get_json()['rental_id']
	amount = request.get_json()['amount']
	cost = request.get_json()['cost']
	
# instantiate the vehicle object
	new_fuel_purchase = Fuel_purchases(vehicle_id, rental_id, amount, cost)
	
	db.session.add(new_fuel_purchase)
	db.session.commit()
	
	return fuel_purchase_schema.jsonify(new_fuel_purchase)
	
	
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