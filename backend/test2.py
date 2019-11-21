import unittest
from flask_testing import TestCase
from mysql4 import app, db, Vehicles, Rentals, Services
from flask import jsonify



class BaseTestCase(TestCase):
    """A base test case."""

    def create_app(self):
        app.config.from_object('config.TestConfig')
        return app

    def setUp(self):
        db.create_all()
        db.session.add(Vehicles("Honda", "Civic", "2010", "1BND321", "Petrol", "40", "TEST"))
        db.session.add(Vehicles("BMW", "X3", "2010", "1BND321", "Petrol", "40", "TEST"))
        db.session.commit()
        #vehicle = Vehicles.query.filter(Vehicles.id == 1).all()
        #print(vehicle)
        db.session.add(Rentals("1", "0", "100", "2010/12/01", "2010/12/02", "K"))
        db.session.add(Services("1", "100", "2010/12/01"))
		#db.session.add(User("admin", "ad@min.com", "admin"))
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()



#class FlaskTestCase(unittest.TestCase):
class FlaskTestCase(BaseTestCase):	


# ################################################
# ######
# ######         TESTING API END POINTS
# ######
# ################################################

# ################################################
# ######             GET Methods
# ###############################################

	# Ensure that GET (all vehicles) works correctly
	
	def test_browse(self):
		#tester = app.test_client(self)
		#response = tester.get('/', content_type='html/text')
		response = self.client.get('/vehicles/show', content_type='html/text')
		response_json = response.get_json()
		#self.assertEqual(response.status_code, 200)
		self.assertIn(b'Honda', response.data)
		self.assertIn(b'BMW', response.data)
		print(response.get_json())
		self.assertTrue(response_json[0]["id"] == 1)
		self.assertTrue(response_json[0]["make"] == "Honda")
		self.assertTrue(response_json[1]["id"] == 2)
		
		
		
	# Ensure that GET (vehicle by id) works correctly
	
	def test_browse_vehicleById(self):
		response = self.client.get('/vehicles/show/2', content_type='html/text')
		#self.assertEqual(response.status_code, 200)
		self.assertIn(b'BMW', response.data)
		print(response.get_json()[0]["id"])
		print(response.get_json()[0]["make"])
		self.assertTrue(response.get_json()[0]["id"] == 2)
		
		
	# Ensure that GET (all rentals) works correctly
	# Expect 'K' on the response as the rental_type is K (km)
	
	def test_all_rentals(self):
		response = self.client.get('/vehicles/rentals/1', content_type='html/text')
		self.assertIn(b'K', response.data)
	
		
		
	#def test_add_new_vehicle(self):
	#	response = self.client.post('/vehicles/add', data=dict(make='Holden', model='Commodore', release_year='2004', registration='1QWE234', fuel='Petrol', tank_size='45', initials='TEST'), follow_redirects=True)
	#	self.assertIn(b'Holden', response.data)

	
# ################################################
# ######
# ######         TESTING queries
# ######
# ################################################
	
	# Ensure that Vehicles query works correctly
	def test_query(self):
		vehicle = Vehicles.query.filter(Vehicles.id == 2).all()
		print(vehicle[0].make)
		self.assertFalse(vehicle[0].make == 'Honda')
		self.assertTrue(vehicle[0].make == 'BMW', vehicle[0].model == 'X3')
    
        
        
		
		
	
if __name__ == '__main__':
	unittest.main()