import { 
    initializeApp //(config) -> App
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'

import { 
    getAuth, //(app) -> Auth
    createUserWithEmailAndPassword, //(auth, email, password) -> Promise<UserCredential>
    onAuthStateChanged, //(auth, nextOrObserver, error, completed) -> Unsubscribe
    sendPasswordResetEmail, //(auth, email, actionCodeSettings) -> Promise<void>
    signInWithEmailAndPassword, //(auth, email, password) -> Promise<UserCredential>
    signOut, //(auth) -> Promise<void>
    getIdToken, //(user, forceRefresh) -> Promise<string>
    sendEmailVerification, //(user, actionCodeSettings) -> Promise<void>
    updatePassword, //(user, newPassword) -> Promise<void>
    getAdditionalUserInfo, //(userCredential) -> AdditionalUserInfo | null
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'

const config = {
    apiKey: "AIzaSyDy2bQYkIhWpaUh-YcTO1B0gt2CG29knHQ",
    authDomain: "beauty-book-395100.firebaseapp.com",
};
const app = initializeApp(config);
const auth = getAuth(app);

const login_user = async () => {
    const input_username = document.getElementById("username");
    const input_password = document.getElementById("password");

    const username = input_username.value;
    const password = input_password.value;

    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    console.log(userCredential);
}

const button_login = document.getElementById("button_login");
button_login.addEventListener("click", login_user);

const signup_user = async () => {
    const input_username = document.getElementById("username");
    const input_password = document.getElementById("password");

    const username = input_username.value;
    const password = input_password.value;

    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    console.log(userCredential);
}

const button_signup = document.getElementById("button_signup");
button_signup.addEventListener("click", signup_user);

onAuthStateChanged(auth,
    function (user) {
        if (user) {
            // User is signed in, so display the "sign out" button and login info.
            console.log(`Signed in as ${user.displayName} (${user.email})`);
            user.getIdToken().then(function (token) {
                document.cookie = "auth_token=" + token;
            });
        } 
        else {
            // Clear the token cookie.
            document.cookie = "auth_token=";
        }
    }, 
    function (error) {
        console.log(error);
        document.cookie = "auth_token=";
    }
);