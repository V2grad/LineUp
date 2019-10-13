from mongoengine import *
from example.models.User import *
import datetime

class Request(EmbeddedDocument):
    client = ReferenceField(User)
    tags = ListField(StringField(), required=True)
    handler = ReferenceField(User)
    created_at = DateTimeField(default=datetime.datetime.utcnow)