from flask import Blueprint, request
from app.controllers import signup_user

routes = Blueprint("routes", __name__)

@routes.route('/signup', methods=['POST'])
def signup():
    data = request.json
    return signup_user(data),201