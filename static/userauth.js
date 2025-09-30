import {
    auth
} from './firebase.js'

import {
    createUserWithEmailAndPassword, //(auth, email, password) -> Promise<UserCredential>
    onAuthStateChanged, //(auth, nextOrObserver, error, completed) -> Unsubscribe
    //sendPasswordResetEmail, //(auth, email, actionCodeSettings) -> Promise<void>
    signInWithEmailAndPassword, //(auth, email, password) -> Promise<UserCredential>
    signOut, //(auth) -> Promise<void>
    getIdToken, //(user, forceRefresh) -> Promise<string>
    //sendEmailVerification, //(user, actionCodeSettings) -> Promise<void>
    //updatePassword, //(user, newPassword) -> Promise<void>
    //getAdditionalUserInfo, //(userCredential) -> AdditionalUserInfo | null
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'

export const loginUser = async (username, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
};

export const signOutUser = async () => {
    await signOut(auth);
};

export const createUser = async (username, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
};

const setUserCookie = async (user) => {
    const token = await getIdToken(user);
    document.cookie = "auth_token=" + token;
};

const clearUserCookie = () => {
    document.cookie = "auth_token=";
}

export const attachOnAuth = async (callbackFunc) => {
    return onAuthStateChanged(auth,
        (user) => {

            if (user) {
                setUserCookie(user);

                if (callbackFunc) {
                    callbackFunc(user);
                }
            }
            else {
                clearUserCookie();

                if (callbackFunc) {
                    callbackFunc(user);
                }
            }
        },
        (error) => {
            console.error("On Auth Error", error);
            clearUserCookie();

            if (callbackFunc) {
                callbackFunc(null, error);
            }
        }
    );
};

export const translateFirebaseError = (error) => {
    if (error.name !== "FirebaseError") {
        console.error("Unknown error", error);
        return "An unknown error has occurred";
    }

    switch (error.code) {
        case "auth/invalid-email":
            return "Please enter a valid email address";
        case "auth/missing-password":
            return "Please enter a password";
        case "auth/user-disabled":
            return "This account has been disabled";
        case "auth/too-many-requests":
            return "This account has been locked. Please reset your password or try again later";
        case "auth/user-not-found":
            return "An account with this email could not be found";
        case "auth/wrong-password":
            return "Invalid email and password combination";
        case "auth/email-already-in-use":
            return "There is already an account with the provided email";
        case "auth/weak-password":
            return "Please use a stronger password";
        default:
            console.error("Unhandled error", error);
            return "An unhandled error has occurred";
    }
}