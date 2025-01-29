from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import projects
from bson.objectid import ObjectId

project_bp = Blueprint("project", __name__)

# Create a new project
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient


project_bp = Blueprint("project_bp", __name__)



# Create a new project
@project_bp.route("/api/project", methods=["POST"])
@jwt_required()
def create_project():
    data = request.json
    user_id = get_jwt_identity()
    data["userId"] = user_id
    result = projects.insert_one(data)
    return jsonify({"msg": "Project created", "projectId": str(result.inserted_id)})


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