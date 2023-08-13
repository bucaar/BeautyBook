import os
from google.cloud import firestore
from firebase_admin import auth, initialize_app
from flask import Flask, render_template, request

if __name__ == "__main__":
    if "GOOGLE_APPLICATION_CREDENTIALS" not in os.environ:
        path = os.path.dirname(__file__)
        os.environ.setdefault("GOOGLE_APPLICATION_CREDENTIALS", path + "/secret/beauty-book-service-cred.json")

app = Flask(__name__)
db = firestore.Client()
default_app = initialize_app()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/logout")
def logout():
    return render_template("logout.html")

@app.route("/create_user")
def create_user():
    user_ref: auth.UserRecord
    user_ref = auth.create_user()
    return "User created: %s" % user_ref.uid

@app.route("/create_doc")
def create_doc():
    doc_ref: firestore.DocumentReference
    doc_time, doc_ref = db.collection("users").add({"first": "Aaron", "last": "Buchholz"})
    return "Doc created: %s" % doc_ref.id

@app.route("/check_user")
def check_user():
    auth_token = request.cookies.get("auth_token")
    if not auth_token:
        return "Not authorized", 401
    
    auth_results = auth.verify_id_token(auth_token)
    print(auth_results)

    return "Hello, %s" % auth_results["email"]

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))