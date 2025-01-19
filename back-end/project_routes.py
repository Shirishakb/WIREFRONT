from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import projects
from bson.objectid import ObjectId

project_bp = Blueprint("project", __name__)

# Create a new project
@project_bp.route("/api/project", methods=["POST"])
@jwt_required()
def create_project():
    user_id = get_jwt_identity()
    data = request.json
    project = {
        "userId": user_id,
        "projectName": data.get("projectName", "Untitled Project")
    }
    project_id = projects.insert_one(project).inserted_id
    return jsonify({"projectId": str(project_id)})


# Get all projects for a specific user
@project_bp.route("/api/project", methods=["GET"])
def get_all_projects():
    all_projects = list(projects.find({}))
    return jsonify([{"projectId": str(p["_id"]), "projectName": p["projectName"]} for p in all_projects])

# Get a specific project by ID
@project_bp.route("/api/project/<projectId>", methods=["GET"])
def get_project(projectId):
    project = projects.find_one({"_id": ObjectId(projectId)})
    return jsonify({"projectId": str(project["_id"]), "projectName": project["projectName"]})


# Get a specific project by ID to delete
@project_bp.route("/api/project/<projectId>", methods=["DELETE"])
@jwt_required()
def delete_project(projectId):
    projects.delete_one({"_id": ObjectId(projectId)})
    return jsonify({"msg": "Project deleted"})