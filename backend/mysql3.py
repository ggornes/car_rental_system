from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_cors import CORS
from sqlalchemy.dialects.mysql import INTEGER, BIGINT, CHAR, DECIMAL, DATE, DATETIME, VARCHAR
from flask_marshmallow import Marshmallow


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

# Vehicle Class/Model
class Vehicles2(db.Model):
	id = db.Column(BIGINT(20, unsigned=True), primary_key=True)
	make = db.Column(VARCHAR(64), nullable=False, default='unknown')
	model = db.Column(VARCHAR(128), nullable=False)
	release_year = db.Column(INTEGER(4, unsigned=True), nullable=False)
	registration = db.Column(VARCHAR(16), nullable=False)
	fuel = db.Column(VARCHAR(8))
	tank_size = db.Column(DECIMAL(4,1))
	#initials = 
	#created = 
	#updated =
	
	def __init__(self, make, model, release_year):
		self.make = make
		self.model = model
		self.release_year = release_year

# Vehicles2 Schema
class Vehicle2Schema(ma.Schema):
	class Meta:
		fields = ('id', 'make', 'model', 'release_year')
		
# init schema
vehicle2_schema = Vehicle2Schema()
vehicles2_schema = Vehicle2Schema(many=True)

# Create a vehicle
@app.route('/vehicle2', methods=['POST'])
def add_vehicle2():
	make = request.json['make']
	model = request.json['model']
	release_year = request.json['release_year']
	
	new_vehicle = Vehicles2(make, model, release_year)
	
	db.session.add(new_vehicle)
	db.session.commit()
	
	return vehicle2_schema.jsonify(new_vehicle)



# Run server
if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='192.168.1.105', debug=True)
