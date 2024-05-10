import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import {getAuth} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyAfqNeWbyEXrH-RcucrykVdk3NSFIZuZ8M",
    authDomain: "journalapp-315d7.firebaseapp.com",
    projectId: "journalapp-315d7",
    storageBucket: "journalapp-315d7.appspot.com",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


console.log(auth)


const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
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