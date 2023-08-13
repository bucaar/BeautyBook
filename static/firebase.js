import { 
    initializeApp //(config) -> App
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'

import { 
    getAuth //(app) -> Auth
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'

const config = {
    apiKey: "AIzaSyDy2bQYkIhWpaUh-YcTO1B0gt2CG29knHQ",
    authDomain: "beauty-book-395100.firebaseapp.com",
};

export const app = initializeApp(config);
export const auth = getAuth(app);