from example.models.User import *


def retrieve_user(req, resp):
    uid = req.context.get('user_id')
    req.context.user = User.objects(uid=uid).first()


class UserMiddleware(object):
    def process_request(self, req, resp):
        retrieve_user(req, resp)
