import {
    signOutUser, attachOnAuth, translateFirebaseError
} from './userauth.js'

const button_signout = document.getElementById("button_signout");
button_signout.addEventListener("click", async () => {
    try {
        await signOutUser();
    }
    catch (error) {
        const message = translateFirebaseError(error);
        const errorMessage = document.getElementById("dashboard-error-message");
        errorMessage.innerText = message;
    }
});

attachOnAuth((user) => {
    if (!user) {
        window.location.replace("/dashboard");
    }
});