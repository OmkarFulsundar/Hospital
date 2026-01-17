from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   # allow React to call Flask

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["hospital_db"]
patients = db["patients"]

# ---------------- GET ALL PATIENTS ----------------
@app.route("/patients", methods=["GET"])
def get_patients():
    data = list(patients.find({}, {"_id": 0}))
    return jsonify(data)

# ---------------- ADD PATIENT ----------------
@app.route("/patients", methods=["POST"])
def add_patient():
    patients.insert_one(request.json)
    return jsonify({"message": "Patient added successfully"})

# ---------------- UPDATE PATIENT ----------------
@app.route("/patients/<pid>", methods=["PUT"])
def update_patient(pid):
    new_data = request.json

    patients.update_one(
        {"pid": pid},
        {"$set": {
            "name": new_data["name"],
            "age": new_data["age"],
            "disease": new_data["disease"]
        }}
    )

    return jsonify({"message": "Patient updated successfully"})

# ---------------- DELETE PATIENT ----------------
@app.route("/patients/<pid>", methods=["DELETE"])
def delete_patient(pid):
    patients.delete_one({"pid": pid})
    return jsonify({"message": "Patient deleted successfully"})

# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)
