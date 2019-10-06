import falcon

from falcon.media.validators.jsonschema import validate

from example.models.User import *
from example.resources import BaseResource


class AuthResource(BaseResource):
    def on_get(self, req, resp):
        if req.context.user:
            resp.status = falcon.HTTP_200
            resp.media = {
                "data": {
                    "user": req.context.user
                }
            }
        else:
            resp.status = falcon.HTTP_404
            resp.media = {
                "message": "User No Found",
                "data": {}
            }

    # @validate(load_schema('scores_creation'))
    def on_post(self, req, resp):

        p = User().save()

        resp.status = falcon.HTTP_201
        resp.media = {
            'id': str(p.id)
        }
