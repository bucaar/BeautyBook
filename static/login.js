import {
    loginUser, signOutUser, createUser, attachOnAuth
} from './userauth.js'

const button_login = document.getElementById("button_login");
button_login.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        await loginUser(username, password);
    }
    catch (error) {
        console.error("Could not log in");
        handleError(error);
    }
});

const button_signup = document.getElementById("button_signup");
button_signup.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        await createUser(username, password);
    }
    catch (error) {
        console.error("Could not sign up");
        handleError(error);
    }
});

// const button_signout = document.getElementById("button_signout");
// button_signout.addEventListener("click", async () => {
//     try {
//         await signOutUser();
//     }
//     catch (error) {
//         console.error("Could not sign up");
//         handleError(error);
//     }
// });

const handleError = (error) => {
    const errorMessage = document.getElementById("login-error-message");
    let message = "";

    if (error.name !== "FirebaseError") {
        message = "An error has occurred";
        console.error("An unknown error occurred", error);
        errorMessage.innerText = message;
        return;
    }

    switch (error.code) {
        case "auth/invalid-email":
            message = "Please enter a valid email address";
            break;
        case "auth/missing-password":
            message = "Please enter a password";
            break;
            case "auth/user-disabled":
                message = "This account has been disabled";
                break;
                case "auth/too-many-requests":
                    message = "This account has been locked. Please reset your password or try again later";
                    break;
        case "auth/user-not-found":
            message = "An account with this email could not be found";
            break;
        case "auth/wrong-password":
            message = "Invalid email and password combination";
            break;
        case "auth/email-already-in-use":
            message = "There is already an account with the provided email";
            break;
        case "auth/weak-password":
            message = "Please use a stronger password";
            break;
        default:
            message = "An error has occurred";
            console.error("An unhandled error occurred", error);
            break;
    }

    errorMessage.innerText = message;
}

await attachOnAuth();