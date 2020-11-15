import React from 'react';
import { useUserContext } from "../../contexts/auth-context";
import { useFavoritesUpdateContext } from "../../contexts/favorites-context";
import { Button } from "@chakra-ui/core";
import { read } from  "../../firebase/firestore";
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
    const setFavourites = useFavoritesUpdateContext()

    const loginWithSocial = () => {

        if ( !user ) {
            var provider = getAuthProvider(type)
            
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                // The signed-in user info.
                var currentUser = result.user;

                // When singing in we must read if the user has any favorites in Firestore. 
                read(currentUser).then( doc => {
                    if(doc.exists) {
                        console.log("Document data", {...doc.data()})
                        setFavourites({...doc.data()})
                    }
                }).catch( e => {
                    console.error("Error getting document:", e)
                })
            }).catch( error => { 
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

