from pymongo import MongoClient


# Connect to the MongoDB database
client = MongoClient("mongodb://localhost:27017/") # Connect to the local MongoDB server
users = client["auth"]["users"] # Access the 'users' collection
projects = client["projects"]["projects"] # Access the 'projects' collection
pages = client["projects"]["pages"] # Access the 'pages' collection
components = client["projects"]["components"] # Access the 'components' collection

