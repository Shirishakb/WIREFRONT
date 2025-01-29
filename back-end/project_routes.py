from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import projects
from bson.objectid import ObjectId

project_bp = Blueprint("project", __name__)

# Create a new project
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient

# Connect to MongoDB and specify the database and collection
client = MongoClient("your_mongodb_uri")
projects = client["WIREFRONT"]["projects"]  # Use the WIREFRONT database

project_bp = Blueprint("project_bp", __name__)


@project_bp.route("/api/projects/user", methods=["GET"])  # Changed route to avoid conflict
@jwt_required()
def get_user_projects():
    user_id = get_jwt_identity()
    all_projects_user = list(projects.find({"userId": user_id}))
    return jsonify([{"projectId": str(p["_id"]), "projectName": p["projectName"]} for p in all_projects_user])



# Get all projects
@project_bp.route("/api/project", methods=["GET"])
def get_all_projects():

    all_projects = list(projects.find({}))

    return jsonify([{"projectId": str(p["_id"]), "projectName": p["projectName"]} for p in all_projects])


# Get a specific project by ID
@project_bp.route("/api/project/<projectId>", methods=["GET"])  
@jwt_required()
def get_project(projectId):
    try:
        if not ObjectId.is_valid(projectId):
            raise Exception("Invalid project ID")
    except:
        return jsonify({"msg": "Invalid project ID"}), 400

    project = projects.find_one({"_id": ObjectId(projectId)})
    return jsonify({"projectId": str(project["_id"]), "projectName": project["projectName"]})


# Update a specific project by ID
@project_bp.route("/api/project/<projectId>", methods=["PUT"])
@jwt_required()
def update_project(projectId):
    try:
        if not ObjectId.is_valid(projectId):
            raise Exception("Invalid project ID")
    except:
        return jsonify({"msg": "Invalid project ID"}), 400
    data = request.json
    projects.update_one({"_id": ObjectId(projectId)}, {"$set": data})
    return jsonify({"msg": "Project updated"})


# Get a specific project by ID to delete
@project_bp.route("/api/project/<projectId>", methods=["DELETE"])
@jwt_required()
def delete_project(projectId):
    try:
        if not ObjectId.is_valid(projectId):
            raise Exception("Invalid project ID")
    except:
        return jsonify({"msg": "Invalid project ID"}), 400
    projects.delete_one({"_id": ObjectId(projectId)})
    return jsonify({"msg": "Project deleted"})