from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import components, pages
from bson.objectid import ObjectId

component_bp = Blueprint("component", __name__)

# Create a new component
@component_bp.route("/api/comp", methods=["POST"])
@jwt_required()
def create_component():
    data = request.json
    page_id = data.get("pageId")

    # Check if the page exists
    if not pages.find_one({"_id": ObjectId(page_id)}):
        return jsonify({"msg": "Page not found"}), 404

    component = {
        "pageId": page_id,
        "componentType": data.get("componentType", "Textbox"),
        "componentSet": data.get("componentSet", "styleSetA"),
        "componentWidth": data.get("componentWidth", 100),
        "componentHeight": data.get("componentHeight", 100),
        "componentXPosition": data.get("componentXPosition", 0),
        "componentYPosition": data.get("componentYPosition", 0)
    }

    component_id = components.insert_one(component).inserted_id
    return jsonify({"componentId": str(component_id)}), 201

# Get all components in a page
@component_bp.route("/api/comp/<pageId>", methods=["GET"])
def get_components_by_page(pageId):
    all_components = list(components.find({"pageId": pageId}))
    return jsonify([
        {
            "componentId": str(c["_id"]),
            "componentType": c["componentType"],
            "componentSet": c["componentSet"],
            "componentWidth": c["componentWidth"],
            "componentHeight": c["componentHeight"],
            "componentXPosition": c["componentXPosition"],
            "componentYPosition": c["componentYPosition"],
            "properties": c.get("properties", {})
        } 
        for c in all_components
    ])

# Get a specific component by ID
@component_bp.route("/api/comp/id/<componentId>", methods=["GET"])
def get_component_by_id(componentId):
    component = components.find_one({"_id": ObjectId(componentId)})
    if not component:
        return jsonify({"msg": "Component not found"}), 404
    return jsonify({
        "componentId": str(component["_id"]),
        "componentType": component["componentType"],
        "componentSet": component["componentSet"],
        "componentWidth": component["componentWidth"],
        "componentHeight": component["componentHeight"],
        "componentXPosition": component["componentXPosition"],
        "componentYPosition": component["componentYPosition"]
    })

# Update a component
@component_bp.route("/api/comp/<componentId>", methods=["PUT"])
@jwt_required()
def update_component(componentId):
    data = request.json
    update_data = {key: value for key, value in data.items() if value is not None}

    result = components.find_one_and_update(
        {"_id": ObjectId(componentId)},
        {"$set": update_data}
    )
    if not result:
        return jsonify({"msg": "Component not found"}), 404
    return jsonify({"msg": "Component updated successfully"})

# Delete a component
@component_bp.route("/api/comp/<componentId>", methods=["DELETE"])
@jwt_required()
def delete_component(componentId):
    result = components.find_one_and_delete({"_id": ObjectId(componentId)})
    if not result:
        return jsonify({"msg": "Component not found"}), 404
    return jsonify({"msg": "Component deleted successfully"})
