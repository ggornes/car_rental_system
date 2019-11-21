import unittest
from flask_testing import TestCase
from mysql4 import app, db, Vehicles



class BaseTestCase(TestCase):
    """A base test case."""

    def create_app(self):
        app.config.from_object('config.TestConfig')
        return app

    def setUp(self):
        db.create_all()
        db.session.add(Vehicles("Honda", "Civic", "2010", "1BND321", "Petrol", "40", "TEST"))
        db.session.add(Vehicles("BMW", "X3", "2010", "1BND321", "Petrol", "40", "TEST"))
		#db.session.add(User("admin", "ad@min.com", "admin"))
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()



#class FlaskTestCase(unittest.TestCase):
class FlaskTestCase(BaseTestCase):	

	# Ensure that Vehicles table was set up correctly
	
	def test_browse(self):
		#tester = app.test_client(self)
		#response = tester.get('/', content_type='html/text')
		response = self.client.get('/vehicles/show', content_type='html/text')
		#self.assertEqual(response.status_code, 200)
		self.assertIn(b'Honda', response.data)
		self.assertIn(b'BMW', response.data)
		#print(response.data)
		
	def test_browse_vehicleById(self):
		response = self.client.get('/vehicles/show/2', content_type='html/text')
		#self.assertEqual(response.status_code, 200)
		self.assertIn(b'BMW', response.data)
		#print(response.data)
		
	#def test_add_new_vehicle(self):
	#	response = self.client.post('/vehicles/add', data=dict(make='Holden', model='Commodore', release_year='2004', registration='1QWE234', fuel='Petrol', tank_size='45', initials='TEST'), follow_redirects=True)
	#	self.assertIn(b'Holden', response.data)
	
	def test_query(self):
		vehicle = Vehicles.query.filter(Vehicles.id == 2).all()
		self.assertTrue(vehicle[0].make == 'BMW', vehicle[0].model == 'X3')
    
        
        
		
		
	
if __name__ == '__main__':
	unittest.main()