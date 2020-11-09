import React from 'react';
import { useUserContext } from "../../contexts/auth-context";
import { Button } from "@chakra-ui/core";
import firebase from "firebase";

function getAuthProvider(type) {
    if(type === 'google') {
        return new firebase.auth.GoogleAuthProvider()
    } else {
        return new firebase.auth.FacebookAuthProvider()
    }
}

export default function Login({ type }) {

    const { user } = useUserContext()

    const loginWithSocial = () => {

        if ( !user ) {
            var provider = getAuthProvider(type)
            
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                // The signed-in user info.
                var currentUser = result.user;

                // setUser(currentUser)
                console.log("user to be changed to ", currentUser)
                console.log("user is changed to ", user)
                // ...
            }).catch(function(error) { 
                // TODO Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                
                console.log("Error ", errorCode, errorMessage)
                // The email of the user's account used.
                // var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
            });
        } else { 
            console.info('Already Logged In', user)
        }
    }

    return (
        <>
            <Button variantColor="teal" variant="outline" size="lg" textAlign="center" onClick={loginWithSocial}>
                { type === 'google' ? 'Google' : 'Facebook' }
            </Button>
        </>
    )
}

