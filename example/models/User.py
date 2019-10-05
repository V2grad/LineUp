from mongoengine import *
import datetime


class User(Document):
    name = StringField(max_length=100, required=True)
    created_at = DateTimeField(default=datetime.datetime.utcnow)