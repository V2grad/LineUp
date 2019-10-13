from mongoengine import *
from example.models.User import *
import datetime

class Request(EmbeddedDocument):
    client = ReferenceField(User)
    tags = ListField(StringField(), required=True)
    handler = ReferenceField(User)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

def add_request(client, tags, handler, created_at):
    request = Request(client=client, tags=tags, handler=handler, created_at=created_at)
    return request
