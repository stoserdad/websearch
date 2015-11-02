from pymongo import MongoClient

client = MongoClient()
db = client.updates
records = db.records


def selectData(vehicleID, userName, dealer, dealerLogin, server, groupName, registrationNumber, userLogin, manufactoryID):
	return [item for item in records.find({'vehicleID': {'$regex': vehicleID},
										   'userName': {'$regex': userName},
										   'dealerName': {'$regex': dealer},
										   'dealerLogin': {'$regex': dealerLogin},
										   'serverName': {'$regex': server},
										   'groupName': {'$regex': groupName},
										   'registrationNumber': {'$regex': registrationNumber},
										   'userLogin': {'$regex': userLogin},
										   'manufactoryID': {'$regex': manufactoryID}}, {'_id': 0})]
