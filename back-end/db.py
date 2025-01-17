from pymongo import MongoClient


# Connect to the MongoDB database
client = MongoClient("mongodb://localhost:27017/") # Connect to the local MongoDB server
users = client["auth"]["users"] # Access the 'users' collection


