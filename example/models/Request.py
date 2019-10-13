from mongoengine import *
from example.models.user import User
import datetime


class Request(EmbeddedDocument):
    client = ReferenceField(User)
    tags = ListField(StringField(), required=True)
    handler = ReferenceField(User)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

def add_event(title, user):
    Event(title=title, eid=eid, creator=user)

    return eid

def add_request(client, tags, handler, created_at):
    request = Request(client=client, tags=tags, handler=handler, created_at=created_at)
    return request