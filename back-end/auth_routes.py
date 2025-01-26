from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from db import users
from models import hash_password, verify_password

# Create a new Blueprint
auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/auth/signup", methods=["POST"])
def signup():
    data = request.json
    
    # Check if username already exists
    if users.find_one({"username": data["username"]}):
        return jsonify({"msg": "User already exists"}), 409
    
    # Add additional validation checks for email and password if needed
    if not data["email"]:
        return jsonify({"msg": "Email is required"}), 400
    if len(data["password"]) < 8:
        return jsonify({"msg": "Password must be at least 8 characters long"}), 400
    
    # Hash password before storing
    hashed_pw = hash_password(data["password"])
    
    # Insert the new user
    users.insert_one({
        "username": data["username"],
        "email": data["email"],
        "password": hashed_pw
    })
    
    return jsonify({"msg": "User created"}), 201



# Login route
@auth_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"username": data["username"]})
    if not user or not verify_password(data["password"], user["password"]):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user["_id"]))
    return jsonify(access_token=access_token)