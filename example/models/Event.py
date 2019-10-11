from mongoengine import *
from example.models.User import *
import datetime
import uuid


class Event(Document):
    eid = StringField(max_length=40, required=True)
    title = StringField(max_length=200, required=True)
    creator = ReferenceField(User, reverse_delete_rule=CASCADE)
    assistants = ListField(ReferenceField(User))
    sections = ListField(StringField()) # Suggested Tags
    users = ListField(ReadPreference(User))
    requests = DictField()
    created_at = DateTimeField(default=datetime.datetime.utcnow)


def add_event(title, user):
    eid = str(uuid.uuid4())
    Event(title=title, eid=eid, creator=user)

    return eid