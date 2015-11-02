# -*- coding: utf-8 -*-
import os
import json
import tornado.web
import tornado.ioloop
from tornado.escape import json_decode
from selectdata import selectData


class MainHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('index.html', messages=None)


class GetHandler(tornado.web.RequestHandler):
	def post(self):
		json_obj = json_decode(self.request.body)
		vehicleID = json_obj['vehicleID'].strip()
		userName = json_obj['userName'].strip()
		dealer = json_obj['dealer'].strip()
		dealerLogin = json_obj['dealerLogin'].strip()
		server = json_obj['server'].strip()
		groupName = json_obj['groupName'].strip()
		registrationNumber = json_obj['registrationNumber'].strip()
		userLogin = json_obj['userLogin'].strip()
		manufactoryID = json_obj['manufactoryID'].strip()
		print json_obj
		self.write(json.dumps(selectData(vehicleID, userName, dealer, dealerLogin, server, groupName, registrationNumber, userLogin, manufactoryID)))


class Application(tornado.web.Application):
	def __init__(self):
		handlers = [
			(r'/', MainHandler),
			(r'/static/(.*)', tornado.web.StaticFileHandler,
			{'path': 'static/'}),
			(r'/data', GetHandler)
		]
		settings = dict(
			debug=True,
			template_path=os.path.join(os.path.dirname(__file__), 'templates'),
			static_path=os.path.join(os.path.dirname(__file__), 'static')
		)
		tornado.web.Application.__init__(self, handlers, **settings)

application = Application()

if __name__ == '__main__':
	application.listen(8006)
	tornado.ioloop.IOLoop.current().start()
