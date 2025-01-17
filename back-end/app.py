from flask import Flask
from flask_jwt_extended import JWTManager
from auth_routes import auth_bp  
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_cors import CORS
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Flask config
app.config["JWT_SECRET_KEY"] = "your_jwt_secret"
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")

# Initialize extensions
jwt = JWTManager(app)
CORS(app)  # Enable CORS for frontend connection
mongo = PyMongo(app)  # MongoDB connection

# Register blueprints
app.register_blueprint(auth_bp)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
