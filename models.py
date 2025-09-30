from dataclasses import dataclass, field
from google.cloud import firestore

@dataclass
class UserAuth:
    # {
    #   'iss': 'https://securetoken.google.com/beauty-book-395100', 
    #   'aud': 'beauty-book-395100', 
    #   'auth_time': 1691959921, 
    #   'user_id': 'T1slc5FFX3bvNqcDWFPFWEQSIJ72', 
    #   'sub': 'T1slc5FFX3bvNqcDWFPFWEQSIJ72', 
    #   'iat': 1691959921, 
    #   'exp': 1691963521, 
    #   'email': 'bucaar@hotmail.com', 
    #   'email_verified': True, 
    #   'firebase': {'identities': {'email': ['bucaar@hotmail.com']}, 
    #   'sign_in_provider': 'password'}, 
    #   'uid': 'T1slc5FFX3bvNqcDWFPFWEQSIJ72'
    # }

    user_id: str
    email: str
    email_verified: bool

@dataclass
class FirestoreDoc:
    doc_id: str = field(init=False)
    doc_ref: firestore.DocumentReference = field(init=False, repr=False)

    @staticmethod
    def from_firestore(source: dict, doc_id: str) -> "FirestoreDoc":
        return FirestoreDoc()

    def to_firestore(self) -> dict:
        return {}
    
    def set_doc_ref(self, doc_ref: firestore.DocumentReference) -> None:
        self.doc_id = doc_ref.id
        self.doc_ref = doc_ref
    
    def set_doc_id(self, doc_id: str) -> None:
        self.doc_id = doc_id

@dataclass
class Location(FirestoreDoc):
    name: str

    @staticmethod
    def from_firestore(source: dict, doc_id: str) -> "Location":
        return Location(
            source.get("name")
        )

    def to_firestore(self) -> dict:
        return {
            "name": self.name
        }
