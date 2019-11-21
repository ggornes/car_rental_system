import os


# default config
class BaseConfig(object):
    DEBUG = False
	#SQLALCHEMY_DATABASE_URI = 'mysql://root@localhost/rental_db_test'
    # shortened for readability
    #SECRET_KEY = '\xbf\xb0\x11\xb1\xcd\xf9\xba\x8bp\x0c...'
    #SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
	#SQLALCHEMY_DATABASE_URI = 'mysql://root@localhost/rental_db_2'


class TestConfig(BaseConfig):
    DEBUG = True
    TESTING = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'mysql://root@localhost/rental_db_test'
	#SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
	#SQLALCHEMY_DATABASE_URI = 'mysql:///:memory:'
	
	
class DevelopmentConfig(BaseConfig):
    DEBUG = True


class ProductionConfig(BaseConfig):
    DEBUG = False