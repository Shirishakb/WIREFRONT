from pymongo import MongoClient

URI = 'mongodb://localhost:27017/'
client = MongoClient(URI)

db = client["WireFrames"]

users_collection = db["Users"]

## config sets up connection and the different collections within the database; I will next import into the controll files