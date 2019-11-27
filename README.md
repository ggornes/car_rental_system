# g@round Documentation
## Table of contents
- [Description](#Description)
- [Features](#Features)
- [Development Stack </>](#Development-Stack)
- [Design](#Design)
  - [Classes](#Classes)
  - [Models](#Models)
  - [Methods](#Methods)
- [Installation](#Installation)
- [Screenshots](#Screenshots)

## Description
A BREAD web app tool to manage a vehicle rental business.
## Features:
+ Keep data records
+ Manage vehicle fleet 
  + Browse, Read, Add, Edit, Delete vehicles. 
  
+ View reports / KPI's
  + Fuel economy
  + Total revenue
  + Fuel consumption costs
  + Rental rate
  + Maintenance to income ratio

## Development Stack

+ #### Node | React JS
  + View

+ #### Python | Flask
  + Model 
  + Controller

  
+ #### MySQL Database Server
  + Data


### Testing Framework:
  + <b>pytest</b>: The pytest framework makes it easy to write small tests, yet scales to support complex functional testing for applications and libraries. ([pytest: helps you write better 
programs — pytest documentation](https://docs.pytest.org/en/latest/))
  + ([Testing Flask Applications — Flask Documentation (1.1.x)](https://flask.palletsprojects.com/en/1.1.x/testing/))


## Design
#### Classes

```mermaid
classDiagram
      class Vehicle {
        +int id
        +String make
        +String model
        +int year
        +String registration
        +String fuel
        +String tank_size
        +add()
        +edit()
        +delete()
      }
      
      class Rental{
        +int id
        +int vehicle_id
        +decimal odometer_start
        +decimal odometer_end
        +date date_start
        +date date_end
        +char rental_type
        +add()
      }

      class FuelPurchase{
        +int id
        +int rental_id
        +decimal amount
        +decimal cost
        +add()
      }
      class Service{
        +int id
        +int vehicle_id
        +decimal odometer
        +date serviced_at
        +add()
      }
```
![Home](./documentation/screenshots/classes.png)

#### Models
```Python
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

```

MySQL statement 
```sql
CREATE TABLE `vehicles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `make` varchar(64) NOT NULL DEFAULT 'unknown',
  `model` varchar(128) NOT NULL,
  `release_year` int(4) unsigned zerofill NOT NULL DEFAULT '0001',
  `registration` varchar(16) NOT NULL,
  `fuel` varchar(8) NOT NULL DEFAULT 'unknown',
  `tank_size` decimal(4,1) unsigned DEFAULT NULL,
  `initials` varchar(4) NOT NULL DEFAULT 'xxx',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4
```

#### Methods
(some examples)
REST API endpoints

```Python
# GET all vehicles
@app.route('/vehicles/show', methods=['GET'])
def get_all_vehicles():
	all_vehicles = Vehicles.query.all()
	result = vehicles_schema.dump(all_vehicles)
	return jsonify(result)


# GET vehicle by id
@app.route('/vehicles/show/<id>', methods=['GET'])
def get_vehicle(id):
	vehicle = Vehicles.query.filter(Vehicles.id == id).all()
	return vehicles_schema.jsonify(vehicle)
  
# GET rentals by vehicle id
@app.route('/vehicles/rentals/<id>', methods=['GET'])
def get_rentals_by_vehicle_id(id):
	rentals = Rentals.query.filter(Rentals.vehicle_id == id).all()
	print(rentals)
	rentals_list = rentals_schema.jsonify(rentals)
	return (rentals_list)
  
# ...

```
Add new vhicle

```javascript
export const vehicle_add = term => {
    return axios
        .post(
            'http://localhost:5000/vehicles/add', {
                make: term.make,
                model: term.model,
                release_year: term.release_year,
                registration: term.registration,
                fuel: term.fuel,
                tank_size: term.tank_size,
                initials: term.initials
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert("Vehicle added to database");
            } else {
                alert("Error while trying to add new vehicle");
            }


        })
};
```

## Installation:


### STEP 1: Create MySQL database and User

```bash
mysql -u root
```

```sql
CREATE DATABASE rental_db CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
CREATE DATABASE rental_db_test CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';

CREATE USER 'rental_db_admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password1'; 

GRANT ALL PRIVILEGES ON rental_db.* TO 'rental_db_admin'@'localhost';

GRANT ALL PRIVILEGES ON rental_db_test.* TO 'rental_db_admin'@'localhost';

GRANT USAGE ON *.* TO 'rental_db_admin'@'localhost';
FLUSH PRIVILEGES;
```

Note: MySQL server must be running (default port is 3306)


### STEP 2: clone the repo
```bash
git clone -b v3.0 https://github.com/ggornes/car_rental_system.git
```

### STEP 3: Install Python (Python 3) dependencies
#### 3.1 Python virtualenv
If you don't want to install dependencies globally, then it is recommended to use a Python virtual environment

Virtualenv is a tool used to create an isolated Python environment. This environment has its own installation directories that doesn't share libraries with other virtualenv environments (and 
optionally doesn't access the globally installed libraries either).

Virtualenv is the easiest and recommended way to configure a custom Python environment. Otherwhise, jump to step 3.2

##### Install:
``` bash
pip install virtualenv
```

##### Create virtual environment:
``` bash
virtualenv ENV
```
Where ENV is a directory in which to place the new virtual environment (example: C:\documents\my_env_folder).

##### Activate virtual environment:
On macOS and Linux:
```bash
source env/bin/activate
```
On windows systems, the activation script is found on ENV\Scripts\activate.bat so just run
```bash
C:\path\to\ENV\Scripts\activate.bat
```
or
```bash
.\env\Scripts\activate
```

#### Deactivate virtual environment:
(whenever you want to stop using the virtualenv)
```bash
deactivate
```


#### 3.2 Installing Python modules
+ <b>Flask</b>: Flask is a lightweight WSGI web application framework. It is designed to make getting started quick and easy, with the ability to scale up to complex applications. It began 
as a simple wrapper around Werkzeug and Jinja and has become one of the most popular Python web application frameworks.

+ <b>SQLAlchemy</b>: is the Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL. It provides a full suite of well known 
enterprise-level persistence patterns, designed for efficient and high-performing database access, adapted into a simple and Pythonic domain language. 
  + <b>Flask-SQLAlchemy</b>: Flask-SQLAlchemy is an extension for Flask that adds support for SQLAlchemy to your application. It aims to simplify using SQLAlchemy with Flask by providing 
useful defaults and extra helpers that make it easier to accomplish common tasks.

+ <b>Flask-MySQLdb</b>

+ <b>Flask-Cors</b>

+ <b>Marshmallow</b>: is an ORM/ODM/framework-agnostic library for converting complex datatypes, such as objects, to and from native Python datatypes.
  + <b>Flask-Marshmallow</b>: Flask-Marshmallow is a thin integration layer for Flask (a Python web framework) and marshmallow (an object serialization/deserialization library) that adds 
additional features to marshmallow, including URL and Hyperlinks fields for HATEOAS-ready APIs. It also (optionally) integrates with Flask-SQLAlchemy.

+ <b>Marshmallow-SQLAlchemy</b>
+ <b>simplejson</b>
+ <b>Flask-Testing</b>

To install all required modules, just run:
```bash
cd backend
pip install -r requirements.txt
```

After installing all modules, if you run
```bash
pip freeze
```
this should be the output:
```bash
Click==7.0
Flask==1.1.1
Flask-Cors==3.0.8
flask-marshmallow==0.10.1
Flask-MySQLdb==0.2.0
Flask-SQLAlchemy==2.4.1
Flask-Testing==0.7.1
itsdangerous==1.1.0
Jinja2==2.10.3
MarkupSafe==1.1.1
marshmallow==3.2.2
marshmallow-sqlalchemy==0.19.0
mysqlclient==1.4.6
python-dotenv==0.10.3
simplejson==3.17.0
six==1.13.0
SQLAlchemy==1.3.11
Werkzeug==0.16.0
```
#### 3.3 Create .env file
```bash
cd backend
touch .env
```
Edit the .env file and add these two lines:
```bash
MYSQL_PASSWORD='Password1'
SQLALCHEMY_DATABASE_URI='mysql://rental_db_admin:Password1@localhost/rental_db'
```
For security reasons, this values should be hidden, but for demonstration purposes I expose the values.


### STEP 4: Initialize the database
cd into /backend and run python script to initialize the database and seed the tables:

```bash
cd backend
python init_db.py
```

### STEP 5: start the API server (localhost:5000)
```bash
python app.py
```

### STEP 6: Install frontend modules using Yarn and start the app
```bash
cd frontend
yarn install
yarn start
```
The app should be running now (localhost:3000)

## Screenshots
![Home](./documentation/screenshots/home.png)
![Browse](./documentation/screenshots/browse.png)
![Add Vehicle](./documentation/screenshots/add.png)
![Details](./documentation/screenshots/details_1.png)
![Home](./documentation/screenshots/add_new_rental.png)