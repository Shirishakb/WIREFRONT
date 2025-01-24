from pymongo import MongoClient
import os

mongo_uri = os.getenv("MONGODB_URI")


client = MongoClient(mongo_uri)

# Connect to the MongoDB database

users = client["auth"]["users"] # Access the 'users' collection
projects = client["projects"]["projects"] # Access the 'projects' collection
pages = client["projects"]["pages"] # Access the 'pages' collection
components = client["projects"]["components"] # Access the 'components' collection

