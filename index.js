import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyAfqNeWbyEXrH-RcucrykVdk3NSFIZuZ8M",
    authDomain: "journalapp-315d7.firebaseapp.com",
    projectId: "journalapp-315d7",
    storageBucket: "journalapp-315d7.appspot.com",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)




const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")


/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)


/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    const email = emailInputEl.value 
    const password = passwordInputEl.value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            showLoggedInView()
            console.log("Successfully signed in")
  })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
  });
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showLoggedInView()
            console.log("Account successfully created")
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authSignOut() { 
    signOut(auth).then(() => {
        showLoggedOutView()
        console.log("logout successful")
        }).catch((error) => {
            consnole.error("An error has occurred")
    });
}



/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}