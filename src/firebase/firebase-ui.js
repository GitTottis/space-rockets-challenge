import firebase from "firebase";
import * as firebaseui from "firebaseui"

export const firebaseUIConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
    },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        },
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        }
    ],
    // Other config options...
};

export const baseui = new firebaseui.auth.AuthUI(firebase.auth())
