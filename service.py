from flask import request
from firebase_admin import auth
from firebase_admin.auth import ExpiredIdTokenError, InvalidIdTokenError
from google.cloud import firestore
from models import Location, UserAuth, FirestoreDoc

def get_user() -> UserAuth:
    auth_token = request.cookies.get("auth_token")
    if not auth_token:
        return None
    
    try:
        auth_results = auth.verify_id_token(auth_token)
    except ExpiredIdTokenError as ex:
        return None
    except InvalidIdTokenError as ex:
        return None

    return UserAuth(auth_results["user_id"], auth_results["email"], auth_results["email_verified"])

def _add_document(collection_ref: firestore.CollectionReference, doc: FirestoreDoc) -> firestore.DocumentReference:
    doc_ref: firestore.DocumentReference
    _, doc_ref = collection_ref.add(doc.to_firestore())
    doc.set_doc_ref(doc_ref)

    return doc_ref

def _get_document(collection_ref: firestore.CollectionReference, doc_id: str, doc_type: type[FirestoreDoc]) -> tuple[FirestoreDoc, firestore.DocumentReference]:
    doc_ref = collection_ref.document(doc_id)
    doc_snapshot = doc_ref.get()
    if not doc_snapshot.exists:
        return None, doc_ref
    doc = doc_type.from_firestore(doc_snapshot.to_dict(), doc_ref.id)
    doc.set_doc_ref(doc_ref)

    return doc, doc_ref

def add_location(db: firestore.Client, name: str) -> Location:
    location = Location(name)
    doc_ref = _add_document(db.collection("locations"), location)
    return location

def get_location(db: firestore.Client, doc_id: str) -> Location:
    location, doc_ref = _get_document(db.collection("locations"), doc_id, Location)
    return location