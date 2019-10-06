import falcon

from example.resources import BaseResource


class IndexResource(BaseResource):
    def on_get(self, req, resp):

        resp.status = falcon.HTTP_200
        resp.media = {
            "hello": "world"
        }