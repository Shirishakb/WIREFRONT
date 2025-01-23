from flask import Flask, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from auth_routes import auth_bp  
from project_routes import project_bp
from page_routes import page_bp
from component_routes import component_bp
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_cors import CORS
from db import client
import os
import logging

# Load environment variables from .env file
load_dotenv()

print("Mongo URI:", os.getenv("MONGODB_URI"))


# Initialize Flask app
app = Flask(__name__)




# Flask config
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your_jwt_secret")  # Load JWT_SECRET_KEY from .env or default value
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")  # Load MONGO_URI from .env

# Initialize extensions
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3003", "https://your-frontend-domain.com"]}})  # Enable CORS for local and deployed frontend
mongo = PyMongo(app)  # MongoDB connection


# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(project_bp)
app.register_blueprint(page_bp)
app.register_blueprint(component_bp)

# Global error handler
@app.errorhandler(Exception)
def handle_exception(e):
    """Handle all exceptions globally and provide response"""
    logging.error(f"An error occurred: {e}")
    return jsonify({"status": "error", "message": str(e)}), 500


# Test MongoDB connection endpoint
@app.route("/test-db", methods=["GET"])
def test_db():
    try:
        client.db.command("ping")  # Ping MongoDB to test the connection
        return {"status": "success", "message": "Connected to MongoDB Atlas"}
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500



# Example JWT token generation endpoint
@app.route("/login", methods=["POST"])
def login():
    # Replace this with actual user authentication logic
    username = "user"  # Just an example, authenticate with your user data
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

# Run the app
if __name__ == "__main__":
    # Logging setup for better error monitoring
    logging.basicConfig(level=logging.DEBUG)  # Logs all messages with severity level DEBUG and higher
    app.run(debug=False, host="0.0.0.0", port=5000)  # Debug mode off for production


