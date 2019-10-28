from flask import Flask, jsonify, request, json #install pip install Flask
from flask_mysqldb import MySQL #install pip install flask-mysqldb
#from datetime import datetime
from flask_cors import CORS # pip install -U flask-cors
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


mysql = MySQL(app)
#bcrypt = Bcrypt(app)
#jwt = JWTManager(app)
CORS(app)

@app.route('/vehicles/show', methods=['GET'])
def get_all_vehicles():
	cur = mysql.connection.cursor()
	#cur.execute("SELECT * FROM rental_db.vehicles")	
	
	#cur.execute("SELECT id, make, model, release_year, registration, fuel, CAST(tank_size AS CHAR) as tank_size, initials, created, updated FROM rental_db.vehicles")
	
	cur.execute("SELECT id, make, model, release_year, registration, fuel, CAST(tank_size AS CHAR) as tank_size, initials, created, updated FROM rental_db.vehicles")

	
	rv = cur.fetchall()
	return jsonify(rv)
	
	#result = {"id": id, "makes": make, "model": model, "release_year": release_year, "registration": registration, "fuel": fuel, "tank_size": tank_size, "initials": initials, "created": created, "updated": updated}
	
	#return jsonify({"result": result})
	
	
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

