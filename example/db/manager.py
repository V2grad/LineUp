from mongoengine import *

# Needed by the setup method as we want to make sure
# all models are loaded before we call create_all(...)

class DBManager(object):
    def __init__(self, connection=None):
        self.connection = connection

        print("Connecting to Database: {}".format(self.connection))
        self.engine = connect(host=self.connection)

    #@property
    # def session(self):
    #     return self.DBSession()
    #
    def setup(self):
        # Normally we would add whatever db setup code we needed here.
        # This will for fine for the ORM
        print('Setup Database: For now, there is nothing XD')