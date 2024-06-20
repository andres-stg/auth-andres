import os
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import cross_origin

api = Blueprint('api', __name__)

@api.route("/token", methods=["POST"])
@cross_origin()
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid credentials"}), 401

@api.route("/signup", methods=["POST"])
@cross_origin()
def signup_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    # Check if the user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    # Create a new user
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201


#@api.route("/users", methods=["PUT"])
#@cross_origin()
#@jwt_required()
#def update_user():
#    current_user_email = get_jwt_identity()
#    user = User.query.filter_by(email=current_user_email).first()
#
#    if user is None:
#       return jsonify({"msg": "User not found"}), 404
#
#    new_email = request.json.get("email", user.email)
#    new_password = request.json.get("password", None)
#
#    if new_email:
#        user.email = new_email
#    if new_password:
#        user.password = generate_password_hash(new_password)
#
#    db.session.commit()
#    return jsonify({"msg": "User updated successfully"}), 200


# @api.route("/login", methods=["GET"])
#     @cross_origin()
#     @jwt_required()
#     def logged_user():

# @api.route("/signup", methods=[POST])
#     @cross_origin()
#     @jwt_required()
#     def signed_user():

# @api.route("/private", methods=[GET])
#     @cross_origin()
#     @jwt_required()
#     def signed_user():