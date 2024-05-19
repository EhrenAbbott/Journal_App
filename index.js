import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup, 
    updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"

import { 
        getFirestore, 
        collection, 
        addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAfqNeWbyEXrH-RcucrykVdk3NSFIZuZ8M",
    authDomain: "journalapp-315d7.firebaseapp.com",
    projectId: "journalapp-315d7",
    storageBucket: "journalapp-315d7.appspot.com",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)





const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")
const userGreetingEl = document.getElementById("user-greeting")

const displayNameInputEl = document.getElementById("display-name-input")
const photoURLInputEl = document.getElementById("photo-url-input")
const updateProfileButtonEl = document.getElementById("update-profile-btn")

const textareaEl = document.getElementById("post-input")
const postButtonEl = document.getElementById("post-btn")


/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

updateProfileButtonEl.addEventListener("click", authUpdateProfile)

postButtonEl.addEventListener("click", postButtonPressed)



/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userGreetingEl, user)
    } else {
        showLoggedOutView()
    }
})


function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Signed in with Google")
        }).catch((error) => {
            console.error(error.message)
        })
}

function authSignInWithEmail() {
    const email = emailInputEl.value 
    const password = passwordInputEl.value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
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
            clearAuthFields()
            console.log("Account successfully created")
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authSignOut() { 
    signOut(auth).then(() => {
        console.log("logout successful")
        }).catch((error) => {
            consnole.error("An error has occurred")
    });
}

function authUpdateProfile() { 
    const newDisplayName = displayNameInputEl.value
    const newPhotoURL = photoURLInputEl.value
    updateProfile(auth.currentUser, {
        displayName: newDisplayName, 
        photoURL: newPhotoURL
        }).then(() => {
            console.log(`Name update: new name is ${newDisplayName} `)
        }).catch((error) => {
            console.error("There has been an error updating the profile")
      });
}

/* = Functions - Firebase - Cloud Firestore = */

async function addPostToDB(postBody) {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
          body: postBody,
        });
        console.log("Posts added with ID: ", docRef.id);
      } catch (error) {
        console.error(error.message);
      }
}



/* == Functions - UI Functions == */

function postButtonPressed() {
    const postBody = textareaEl.value
    
    if (postBody) {
        addPostToDB(postBody)
        clearInputField(textareaEl)
    }
}

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex"
}

function hideView(view) {
    view.style.display = "none"
}

function clearInputField(field) {
	field.value = ""
}

function clearAuthFields() {
	clearInputField(emailInputEl)
	clearInputField(passwordInputEl)
}

function showProfilePicture(imgElement, user){ 
    if (user.photoURL){ 
        imgElement.src = user.photoURL
    } else { 
        imgElement.src = "assets/icons/profile.icon.webp"
    }
}

function showUserGreeting(element, user) { 
    const displayName = user.displayName
    if (displayName){ 
        const userFirstName = displayName.split(" ")[0]
        element.innerText = `Welcome, ${userFirstName}, how are you?`
    } else { 
        element.innerText = "Welcome, friend, how are you?"
    }
}