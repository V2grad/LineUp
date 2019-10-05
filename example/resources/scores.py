import falcon

from falcon.media.validators.jsonschema import validate

from example.db.Page import *
from example.resources import BaseResource
from example.schemas import load_schema


class ScoresResource(BaseResource):
    def on_get(self, req, resp):

        resp.status = falcon.HTTP_200
        resp.media = {
            "hello": "world"
        }

    # @validate(load_schema('scores_creation'))
    def on_post(self, req, resp):

        p = Page(title=req.media.get('title')).save()

        resp.status = falcon.HTTP_201
        resp.media = {
            'id': str(p.id)
        }
