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
    console.log("Logged in as", userCredential);
};

export const signOutUser = async () => {
    await signOut(auth);
    console.log("Signed out");
};

export const createUser = async (username, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    console.log("Created user", userCredential);
};

const setUserCookie = async (user) => {
    const token = await getIdToken(user);
    document.cookie = "auth_token=" + token;
};

const clearUserCookie = () => {
    document.cookie = "auth_token=";
}

export const attachOnAuth = async () => {
    return onAuthStateChanged(auth,
        (user) => {
            console.log("On Auth", user);

            if (user) {
                console.log(`Signed in as ${user.email} (${user.displayName})`);
                setUserCookie(user);
            }
            else {
                clearUserCookie();
            }
        },
        (error) => {
            console.error("An error occurred within On Auth", error);
            clearUserCookie();
        }
    );
};