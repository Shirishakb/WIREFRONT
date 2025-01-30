from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from db import pages, projects
from bson.objectid import ObjectId

page_bp = Blueprint("page", __name__)

# Create a new page with default values
@page_bp.route("/api/page", methods=["POST"])
@jwt_required()
def create_page():
    data = request.json
    project_id = data.get("projectId")

    # Validate the project exists
    if not projects.find_one({"_id": ObjectId(project_id)}):
        return jsonify({"msg": "Project not found"}), 404

    new_page = {
        "projectId": project_id,
        "pageName": data.get("pageName", "Untitled Page"),
        "pageWidth": data.get("pageWidth", 1920),
        "pageHeight": data.get("pageHeight", 1080),
    }
    
    page_id = pages.insert_one(new_page).inserted_id
    return jsonify({"pageId": str(page_id)}), 201

# Get all pages for a specific project
@page_bp.route("/api/page/<projectId>", methods=["GET"])
@jwt_required()
def get_pages_by_project(projectId):

    id = '123'

    try:
        id = ObjectId(projectId)
    except Exception as e:
        return jsonify({"msg": "Invalid project ID"}), 400

    # Ensure the project exists
    if not projects.find_one({"_id": ObjectId(projectId)}):
        return jsonify({"msg": "Project not found"}), 404

    all_pages = list(pages.find({"projectId": projectId}))
    return jsonify([
        {
            "pageId": str(p["_id"]),
            "pageName": p["pageName"],
            "pageWidth": p["pageWidth"],
            "pageHeight": p["pageHeight"]
        } 
        for p in all_pages
    ])

# Get a specific page by ID
@page_bp.route("/api/page/id/<pageId>", methods=["GET"])
@jwt_required()
def get_page_by_id(pageId):
    page = pages.find_one({"_id": ObjectId(pageId)})
    if not page:
        return jsonify({"msg": "Page not found"}), 404

    return jsonify({
        "pageId": str(page["_id"]),
        "projectId": page["projectId"],
        "pageName": page["pageName"],
        "pageWidth": page["pageWidth"],
        "pageHeight": page["pageHeight"]
    })

# Update a page
@page_bp.route("/api/page/<pageId>", methods=["PUT"])
@jwt_required()
def update_page(pageId):
    data = request.json
    update_data = {key: value for key, value in data.items() if value is not None}

    result = pages.find_one_and_update(
        {"_id": ObjectId(pageId)},
        {"$set": update_data}
    )
    if not result:
        return jsonify({"msg": "Page not found"}), 404
    return jsonify({"msg": "Page updated successfully"})

# Delete a page
@page_bp.route("/api/page/<pageId>", methods=["DELETE"])
@jwt_required()
def delete_page(pageId):
    result = pages.find_one_and_delete({"_id": ObjectId(pageId)})
    if not result:
        return jsonify({"msg": "Page not found"}), 404
    return jsonify({"msg": "Page deleted successfully"})
