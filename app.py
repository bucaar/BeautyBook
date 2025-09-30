import os
from flask import Flask, render_template

app = Flask(__name__)
# db = firestore.Client()
# default_app = initialize_app()

# def require_user(redirect_path: str = None):
#     # Return a new function that wraps the function
#     def wrapper(func):
#         # Return the decorated functionality
#         @wraps(func)
#         def decorated(*args, **kwargs):
#             # Check for our user
#             user = get_user()
#             if not user:
#                 if redirect_path:
#                     return redirect(url_for(redirect_path))
                
#                 return "Not authorized", 401

#             # Call the wrapped function to get the response
#             # Inject the user auth object
#             resp = func(*args, **kwargs, user=user)
#             return resp

#         return decorated
#     return wrapper

@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/login")
# def login():
#     return render_template("login.html")

# @app.route("/dashboard")
# @require_user("login")
# def dashboard(user: UserAuth):
#     # user = get_user()
#     username = user.email
#     return render_template("dashboard.html", username=username)

# @app.route("/api/create_location/<name>")
# @require_user()
# def api_create_location(name, user: UserAuth):
#     location = add_location(db, name)
#     return "%s" % location

# @app.route("/api/get_location/<doc_id>")
# @require_user()
# def api_get_location(doc_id, user: UserAuth):
#     location = get_location(db, doc_id)
#     return "%s" % location

if __name__ == "__main__":
    app.run(host="192.168.99.108", port=int(os.environ.get("PORT", 5522)))