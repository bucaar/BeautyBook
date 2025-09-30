import {
    loginUser, createUser, attachOnAuth, translateFirebaseError
} from './userauth.js'

const button_login = document.getElementById("button_login");
button_login.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        await loginUser(username, password);
    }
    catch (error) {
        const message = translateFirebaseError(error);
        const errorMessage = document.getElementById("login-error-message");
        errorMessage.innerText = message;
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
        const message = translateFirebaseError(error);
        const errorMessage = document.getElementById("login-error-message");
        errorMessage.innerText = message;
    }
});

attachOnAuth((user) => {
    if (user) {
        window.location.replace("/dashboard");
    }
});