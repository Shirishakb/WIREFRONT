from flask import Flask
from flask_jwt_extended import JWTManager
from auth_routes import auth_bp  
from project_routes import project_bp
from page_routes import page_bp
from component_routes import component_bp
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
CORS(app, resources={r"/*": {"origins": ["http://localhost:3003", "https://your-frontend-domain.com"]}})  # Enable CORS for both local and deployed frontend
mongo = PyMongo(app)  # MongoDB connection

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(project_bp)
app.register_blueprint(page_bp)
app.register_blueprint(component_bp)



# Run the app
if __name__ == "__main__":
    app.run(debug=True)
