from mysql4 import app
import unittest

class FlaskTestCase(unittest.TestCase):
	
	#Ensure that flask was set up correctly
	def test_browse(self):
		tester = app.test_client(self)
		response = tester.get('/vehicles/show', content_type='html/text')
		self.assertEqual(response.status_code, 200)
		
	
if __name__ == '__main__':
	unittest.main()