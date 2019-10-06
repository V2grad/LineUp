import falcon

from example.db.manager import DBManager
from example.middleware.context import ContextMiddleware
from example.middleware.retrieve_user import UserMiddleware


class MyService(falcon.API):
    def __init__(self, cfg):
        super(MyService, self).__init__(
            middleware=[ContextMiddleware(), UserMiddleware()]
        )

        self.cfg = cfg

        # Build an object to manage our db connections.
        mgr = DBManager(self.cfg.db.connection)
        mgr.setup()

        # Build routes
        from example.router import register
        register(self)

    def start(self):
        """ A hook to when a Gunicorn worker calls run()."""
        pass

    def stop(self, signal):
        """ A hook to when a Gunicorn worker starts shutting down. """
        pass
