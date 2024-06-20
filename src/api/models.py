from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(999), unique=True, nullable=False)
    password = db.Column(db.String(999), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)

    def __init__(self, email, password, is_active=True):
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.is_active = is_active

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
