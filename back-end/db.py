from pymongo import MongoClient
import os

# Use the updated MONGODB_URI to connect to the "WIREFRONT" database
mongo_uri = os.getenv("MONGODB_URI")

client = MongoClient(mongo_uri)

# Access the collections in the 'WIREFRONT' database
users = client["WIREFRONT"]["users"]
projects = client["WIREFRONT"]["projects"]
pages = client["WIREFRONT"]["pages"]
components = client["WIREFRONT"]["components"]

# Example data to insert into each collection

user_data = {
    "username": "new_user",
    "password": "hashed_password_here",  # Ensure to hash passwords for security
    "email": "new_user@example.com"
}

project_data = {
    "userId": "some_user_id_here",
    "projectName": "My New Project"
}

page_data = {
    "projectId": "some_project_id_here",
    "pageTitle": "Home Page",
    "content": "<h1>Welcome to my page</h1>"
}

component_data = {
    "pageId": "some_page_id_here",
    "componentType": "text",
    "content": "This is a text component"
}
# Inserting data into the collections
#users.insert_one(user_data)  # Insert a single user
#projects.insert_one(project_data)  # Insert a single project
#pages.insert_one(page_data)  # Insert a single page
#omponents.insert_one(component_data)  # Insert a single component

# Example query to fetch all users to verify insertion
#users_data = list(users.find())
#print("Users:", users_data)

# Example query to fetch all projects to verify insertion
#projects_data = list(projects.find())
#print("Projects:", projects_data)