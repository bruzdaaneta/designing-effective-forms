
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKuPpqpoKv8jVvfE8YAJnDYiuPG3uQL7s",
  authDomain: "laby4-7a4fc.firebaseapp.com",
  projectId: "laby4-7a4fc",
  storageBucket: "laby4-7a4fc.appspot.com",
  messagingSenderId: "747275524101",
  appId: "1:747275524101:web:6c5ec8103ed2f1cc17a46c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    //await signOut(auth);
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
       
   
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
            case 'auth/popup-closed-by-user':
                alert('Okno uwierzytelniania zostało zamknięte przez użytkownika.');
                break;
            case 'auth/popup-blocked':
                alert('Okno uwierzytelniania zostało zablokowane przez przeglądarkę.');
                break;
            case 'auth/user-disabled':
                alert('Twoje konto zostało wyłączone. Skontaktuj się z administratorem.');
                break;
            case 'auth/user-not-found':
                alert('Nie znaleziono użytkownika. Sprawdź poprawność danych.');
                break;
            case 'auth/wrong-password':
                alert('Nieprawidłowe hasło. Sprawdź poprawność danych.');
                break;
            default:
                alert('Wystąpił błąd podczas uwierzytelniania: ' + errorMessage);
        }
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
 }
 
 onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email
        const displayName = user.displayName;
        const name = displayName.split(" ")[0];
        const surname = displayName.split(" ")[1];
        emailInput.value = email;
        firstNameInput.value = name;
        lastNameInput.value = surname;
        alert("You are authenticated with Google");
    }
 })

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');




