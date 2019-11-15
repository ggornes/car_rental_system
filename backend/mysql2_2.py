from flask import Flask, jsonify, request, json #install pip install Flask
from flask_mysqldb import MySQL #install pip install flask-mysqldb
from flask_cors import CORS # pip install -U flask-cors
from flask_sqlalchemy import SQLAlchemy
#from datetime import datetime
#from flask_bcrypt import Bcrypt
#from flask_jwt_extended import JWTManager
#from flask_jwt_extended import create_access_token


app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'rental_db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JSON_SORT_KEYS'] = False
#app.config['JWT_SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE'] = 'rental_db'
db = SQLAlchemy(app)

mysql = MySQL(app)
CORS(app)
#bcrypt = Bcrypt(app)
#jwt = JWTManager(app)


@app.route('/vehicles/show', methods=['GET'])
def get_all_vehicles():
	cur = mysql.connection.cursor()
	cur.execute("SELECT id, make, model, release_year, registration, fuel, CAST(tank_size AS CHAR) as tank_size, initials, created, updated FROM rental_db.vehicles")
	rv = cur.fetchall()
	return jsonify(rv)

	

#@app.route('/vehicles/show2', methods=['GET'])
#def get_all_vehicles2():
#	cur = mysql.connection.cursor()
#	cur.execute("SELECT id, make, model, release_year, registration, fuel, CAST(tank_size AS CHAR) as tank_size FROM rental_db.vehicles")
#	rv = cur.fetchall()
#	return jsonify(rv)

	
	
@app.route('/vehicles/show/<id>', methods=['GET'])
def get_vehicle_by_id(id):
	cur = mysql.connection.cursor()
	cur.execute("SELECT id, make, model, release_year, registration, fuel, CAST(tank_size AS CHAR) as tank_size, initials FROM rental_db.vehicles WHERE id = " + id)
	rv = cur.fetchall()
	return jsonify(rv)
	
	
#@app.route('/vehicles/rentals/<id>', methods=['GET'])
#def get_rentals_by_vehicle_id(id):
#	cur = mysql.connection.cursor()
#	cur.execute(" SELECT id, vehicle_id, CAST(odometer_start as CHAR) as odometer_start, CAST(odometer_end as CHAR) odometer_end, CAST((odometer_end - odometer_start) as CHAR) distance, date_start, date_end, rental_type, created, updated FROM rental_db.rentals WHERE vehicle_id = " + id)
#	rv = cur.fetchall()
#	cur.execute("SELECT COUNT(*) as total_rentals, CAST(SUM(distance) as CHAR) as total_distance FROM (SELECT id, vehicle_id, CAST(odometer_start as CHAR) as odometer_start, CAST(odometer_end as CHAR) odometer_end, (odometer_end - odometer_start) as distance, date_start, date_end, rental_type, created updated FROM rental_db.rentals WHERE vehicle_id = " + id + ") as rentals_summary")
#	rv2 = cur.fetchall()
#	return jsonify(rv, rv2)
	
	
	
@app.route('/vehicles/rentals/<id>', methods=['GET'])
def get_rentals_by_vehicle_id(id):
	# rentals list
	cur = mysql.connection.cursor()
	cur.execute(" SELECT date_format(date_start, '%Y-%m-%d') as date_start, CAST((odometer_end - odometer_start) as CHAR) distance, date_format(date_end, '%Y-%m-%d') as date_end, rental_type, CAST(IF(rental_type='D', 100, odometer_end - odometer_start) as CHAR) as rental_cost from rentals where vehicle_id = " + id)
	rv = cur.fetchall()
	
	#rentals summary
	cur.execute("SELECT COUNT(*) as total_rentals, CAST(SUM(distance) as CHAR) as total_distance, CAST(SUM(rental_cost) as CHAR) as total_cost FROM (SELECT id, vehicle_id, CAST(odometer_start as CHAR) as odometer_start, CAST(odometer_end as CHAR) odometer_end, (odometer_end - odometer_start) as distance, date_start, date_end, rental_type, IF(rental_type='D', 100, odometer_end - odometer_start) as rental_cost, created updated FROM rental_db.rentals WHERE vehicle_id = " + id + ") as rentals_summary")
	rv2 = cur.fetchall()
	return jsonify(rv, rv2)
	

	
#@app.route('/vehicles/fuel_purchases/<id>', methods=['GET'])
#def get_fuel_purchases_by_vehicle_id(id):

#	cur = mysql.connection.cursor()
#	cur.execute(" SELECT id, vehicle_id, rental_id, CAST(amount as CHAR) as amount, CAST(cost as CHAR) cost, created, updated FROM rental_db.fuel_purchases WHERE vehicle_id = " + id)
#	rv = cur.fetchall()

#	cur.execute("SELECT COUNT(*) as total_fuel_purchases, CAST(SUM(amount) as CHAR) as total_amount, CAST(SUM(cost) as CHAR) as total_cost from (SELECT id, vehicle_id, rental_id, CAST(amount as CHAR) as amount, CAST(cost as CHAR) cost, created, updated FROM rental_db.fuel_purchases WHERE vehicle_id = " + id + ") as fuel_purchases_summary;")
#	rv2 = cur.fetchall()
#	return jsonify(rv, rv2)
	
	
@app.route('/vehicles/fuel_purchases/<id>', methods=['GET'])
def get_fuel_purchases_by_vehicle_id(id):
	# Fuel_purchases list
	cur = mysql.connection.cursor()
	cur.execute(" SELECT date_format(created, '%Y-%m-%d') as created, CAST(amount as CHAR) as amount, CAST(cost as CHAR) cost FROM rental_db.fuel_purchases WHERE vehicle_id = " + id)
	rv = cur.fetchall()
	
	#Fuel purchases summary
	cur.execute("SELECT COUNT(*) as total_fuel_purchases, CAST(SUM(amount) as CHAR) as total_amount, CAST(SUM(cost) as CHAR) as total_cost from (SELECT id, vehicle_id, rental_id, CAST(amount as CHAR) as amount, CAST(cost as CHAR) cost, created, updated FROM rental_db.fuel_purchases WHERE vehicle_id = " + id + ") as fuel_purchases_summary;")
	rv2 = cur.fetchall()
	return jsonify(rv, rv2)
	
#@app.route('/vehicles/services/<id>', methods=['GET'])
#def get_services_by_vehicle_id(id):
#	cur = mysql.connection.cursor()
#	
#	cur.execute(" SELECT id, vehicle_id, CAST(odometer as CHAR) as odometer, created, updated FROM rental_db.services WHERE vehicle_id = " + id)
#	
#	rv = cur.fetchall()
#	
#	return jsonify(rv)
	
	
@app.route('/vehicles/services/<id>', methods=['GET'])
def get_services_by_vehicle_id(id):
	# Services list
	cur = mysql.connection.cursor()
	cur.execute(" SELECT date_format(serviced_at, '%Y-%m-%d') as serviced_at, CAST(odometer as CHAR) as odometer FROM rental_db.services WHERE vehicle_id = " + id)
	rv = cur.fetchall()
	
	# Services summary
	#cur.execute()
	
	
	
	return jsonify(rv)
	
	
@app.route('/vehicles/add', methods=['POST'])
def add_vehicle():
	cur = mysql.connection.cursor()
	#id = request.get_json()['id']
	make = request.get_json()['make']
	model = request.get_json()['model']
	release_year = request.get_json()['release_year']
	registration = request.get_json()['registration']
	fuel = request.get_json()['fuel']
	tank_size = request.get_json()['tank_size']
	initials = request.get_json()['initials']
	#cur.execute("INSERT INTO `vehicles`(`id`,`make`,`model`,`release_year`,`registration`,`fuel`,`tank_size`,`initials`) VALUES (id +", '" + str(make) +"', '" + str(model) +"', " + release_year + ", '" + str(registration) + "', '" + str(fuel) +"', " + tank_size + ", '" + str(initials) + "'")
	#cur.execute("INSERT INTO `vtest`(`id`,`make`) VALUES (id, make)")
	#works cur.execute("INSERT INTO `vtest`(`id`, `make`) VALUES (id, '" +str(make) + "')")
	#cur.execute("INSERT INTO `vtest3`(`id`, `make`, `model`, `release_year`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "')")
	#cur.execute("INSERT INTO `vtest4`(`id`, `make`, `model`, `release_year`, `registration`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "')")
	#cur.execute("INSERT INTO `vtest5`(`id`, `make`, `model`, `release_year`, `registration`, `fuel`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "', '" + str(fuel) + "')")
	#cur.execute("INSERT INTO `vtest6`(`id`, `make`, `model`, `release_year`, `registration`, `fuel`, `tank_size`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "', '" + str(fuel) + "', '" + str(tank_size) + "')")
	
	
	#cur.execute("INSERT INTO `vehicles`(`id`, `make`, `model`, `release_year`, `registration`, `fuel`, `tank_size`, `initials`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "', '" + str(fuel) + "', '" + str(tank_size) + "', '" + str(initials) + "')")

	cur.execute("INSERT INTO `vehicles`(`make`, `model`, `release_year`, `registration`, `fuel`, `tank_size`, `initials`) VALUES ('" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "', '" + str(fuel) + "', '" + str(tank_size) + "', '" + str(initials) + "')")
	mysql.connection.commit()
	result = {'make': make, 'model': model, 'release_year': release_year, 'registration': registration, 'fuel': fuel, 'tank_size':tank_size, 'initials': initials}
	
	return jsonify({"result": result})
	
	

	
	

	
	
@app.route('/vehicles/rentals/add', methods=['POST'])
def add_rental():
	cur = mysql.connection.cursor()
	#id = request.get_json()['id']
	vehicle_id = request.get_json()['vehicle_id']
	odometer_start = request.get_json()['odometer_start']
	odometer_end = request.get_json()['odometer_end']
	date_start = request.get_json()['date_start']
	date_end = request.get_json()['date_end']
	rental_type = request.get_json()['rental_type']


	cur.execute("INSERT INTO `rentals`(`vehicle_id`, `odometer_start`, `odometer_end`, `date_start`, `date_end`, `rental_type`) VALUES ('" + str(vehicle_id) + "', '" + str(odometer_start) + "', '" + str(odometer_end) + "', '" + str(date_start) + "', '" + str(date_end) + "', '" + str(rental_type) + "')")
	mysql.connection.commit()
	result = {'vehicle_id': vehicle_id, 'odometer_start': odometer_start, 'odometer_end': odometer_end, 'date_start': date_start, 'date_end': date_end, 'rental_type':rental_type}
	
	return jsonify({"result": result})
	
	
	
@app.route('/vehicles/fuel_purchase/add', methods=['POST'])
def add_fuel_purchase():
	cur = mysql.connection.cursor()
	vehicle_id = request.get_json()['vehicle_id']
	rental_id = request.get_json()['rental_id']
	amount = request.get_json()['amount']
	cost = request.get_json()['cost']


	cur.execute("INSERT INTO `fuel_purchases`(`vehicle_id`, `rental_id`, `amount`, `cost`) VALUES ('" + str(vehicle_id) + "', '" + str(rental_id) + "', '" + str(amount) + "', '" + str(cost) + "')")
	mysql.connection.commit()
	result = {'vehicle_id': vehicle_id, 'rental_id': rental_id, 'amount': amount, 'cost': cost}
	
	return jsonify({"result": result})
	
	

@app.route('/vehicles/services/add', methods=['POST'])
def add_service():
	cur = mysql.connection.cursor()
	vehicle_id = request.get_json()['vehicle_id']
	odometer = request.get_json()['odometer']
	serviced_at = request.get_json()['serviced_at']
	
	cur.execute("INSERT INTO `services`(`vehicle_id`, `odometer`, `serviced_at`) VALUES ('" + str(vehicle_id) + "', '" + str(odometer) + "', '" + str(serviced_at) + "')")
	mysql.connection.commit()
	result = {'vehicle_id': vehicle_id, 'odometer': odometer, 'serviced_at': serviced_at}
	
	return jsonify({"result": result})
	
	
@app.route('/vehicles/addd', methods=['POST'])
def addd_vehicle():
	cur = mysql.connection.cursor()
	#id = request.get_json()['id']
	make = request.get_json()['make']
	model = request.get_json()['model']
	release_year = request.get_json()['release_year']


	#cur.execute("INSERT INTO `vehicles`(`id`,`make`,`model`,`release_year`,`registration`,`fuel`,`tank_size`,`initials`) VALUES (id +", '" + str(make) +"', '" + str(model) +"', " + release_year + ", '" + str(registration) + "', '" + str(fuel) +"', " + tank_size + ", '" + str(initials) + "'")
	#cur.execute("INSERT INTO `vtest`(`id`,`make`) VALUES (id, make)")
	#works cur.execute("INSERT INTO `vtest`(`id`, `make`) VALUES (id, '" +str(make) + "')")
	#cur.execute("INSERT INTO `vtest3`(`id`, `make`, `model`, `release_year`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "')")
	#cur.execute("INSERT INTO `vtest4`(`id`, `make`, `model`, `release_year`, `registration`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "')")
	#cur.execute("INSERT INTO `vtest5`(`id`, `make`, `model`, `release_year`, `registration`, `fuel`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "', '" + str(fuel) + "')")
	#cur.execute("INSERT INTO `vtest6`(`id`, `make`, `model`, `release_year`, `registration`, `fuel`, `tank_size`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "', '" + str(fuel) + "', '" + str(tank_size) + "')")
	
	
	#cur.execute("INSERT INTO `vehicles`(`id`, `make`, `model`, `release_year`, `registration`, `fuel`, `tank_size`, `initials`) VALUES (id, '" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "', '" + str(registration) + "', '" + str(fuel) + "', '" + str(tank_size) + "', '" + str(initials) + "')")

	cur.execute("INSERT INTO `vtest3`(`make`, `model`, `release_year`) VALUES ('" + str(make) + "', '" + str(model) + "', '" + str(release_year) + "')")
	mysql.connection.commit()
	result = {'make': make, 'model': model, 'release_year': release_year}
	
	return jsonify({"result": result})
	
	
	
@app.route('/vehicles/edit/<id>', methods=['PUT'])
def edit_vehicle(id):
	cur = mysql.connection.cursor()
	make = request.get_json()['make']
	model = request.get_json()['model']
	release_year = request.get_json()['release_year']
	registration = request.get_json()['registration']
	fuel = request.get_json()['fuel']
	tank_size = request.get_json()['tank_size']
	initials = request.get_json()['initials']
	
	# #######################################################
	# ToDo: Validate variables; 
	# asign default values if variable empty or null;
	# stringify the SQL statement
	#
	# if foo = request.get_json()['var']
	# is empty or null
	# foo = null
	#
	# 
	#
	# ##########################################################
	
	#cur.execute("UPDATE `vehicles` SET `make` = '" + str(make) + "' where `id` = " + id)
	#cur.execute("UPDATE `vehicles` SET `make` = '" + str(make) + "', `model` = '" + str(model) + "' WHERE `id` = " + id)
	#cur.execute("UPDATE `vehicles` SET `make` = '" + str(make) + "', `model` = '" + str(model) + "', `release_year` = '" + str(release_year) + "', `registration` = '" + str(registration) + "', `fuel` = '" + str(fuel) + "' WHERE `id` = " + id)
	cur.execute("UPDATE `vehicles` SET `make` = '" + str(make) + "', `model` = '" + str(model) + "', `release_year` = '" + str(release_year) + "', `registration` = '" + str(registration) + "', `fuel` = '" + str(fuel) + "', `tank_size` = '" + str(tank_size) + "', `initials` = '" + str(initials) + "' WHERE `id` = " + id)
	mysql.connection.commit()
	
	result = {"make": make, "model": model, "release_year": release_year, "registration": registration, "fuel": fuel, "tank_size": tank_size, "initials": initials}
	
	return jsonify({"result": result})
	
	
@app.route('/vehicles/delete/<id>', methods=['DELETE'])
def delete_vehicle(id):
	cur = mysql.connection.cursor()
	response = cur.execute("DELETE FROM `vehicles` WHERE id = " + id)
	mysql.connection.commit()
	
	if response > 0:
		result = {'message': 'Record deleted'}
	else:
		result = {'message': 'No record found'}
		
	return jsonify({"result": result})
	
	

if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='192.168.1.105', debug=True)

