from flask import jsonify
from config.connection import users_collection

def signup_user(data):
    username = data.get("username")
    password = data.get("password")

    new_user = {"username": username, "password": password}
    result = users_collection.insert_one(new_user)

    inserted_user = users_collection.find_one({"_id": result.inserted_id})
    return jsonify(str(inserted_user))