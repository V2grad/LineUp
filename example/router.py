from example.resources.index import *
from example.resources.auth import *
from example.resources.user import *

def routes():
    return [
        ['/', IndexResource()],
        ['/auth', AuthResource()],
        ['/user', UserResource()]
    ]


# Build routes
def register(app):
    for i in routes():
        app.add_route(i[0], i[1])
