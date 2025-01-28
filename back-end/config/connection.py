from pymongo import MongoClient

URI = 'mongodb://localhost:27017/'
client = MongoClient(URI)

db = client["Wirefront"]

users_collection = db["Users"]