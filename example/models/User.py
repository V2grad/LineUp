from mongoengine import *
import datetime
import uuid

class User(Document):
    uid = StringField(max_length=40, required=True)
    name = StringField(max_length=100, required=True)
    created_at = DateTimeField(default=datetime.datetime.utcnow)


# We will create our own uuid to avoid ObjectID XD
def add_user(name):
    uid = str(uuid.uuid4())  # len() = 36
    User(name=name, uid=uid).save()
    return uid