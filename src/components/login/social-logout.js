import React from 'react';
import { useUserContext } from "../../contexts/auth-context";
import { useFavoritesContext } from "../../contexts/favorites-context";
import { Button } from "@chakra-ui/core";
import firebase from "firebase";
import { write } from "../../firebase/firestore";


export default function Logout() {

    const { user } = useUserContext()
    const { favourites } = useFavoritesContext()

    const logout = () => {
        if ( !!user ) {
            // First write to Firestore the selected Favorites
            write(favourites, user)
                .then(()=> {
                    firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                        console.info("Signed out OK. Redirecting to Home")
                    }).catch(function(error) {
                        // An error happened.
                        console.error("Error when Singing out ",error)
                    });
                })
                .catch( error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    
                    console.log("Error ", errorCode, errorMessage)
                    // TODO Handle Errors here.
                })
        }
    }

    return (
        <>
            <Button 
                fontWeight="bold"
                fontSize="lg"
                bg="transparent"
                variantColor="teal" 
                variant="outline" 
                size="lg" 
                textAlign="center" 
                onClick={logout}
            >
                Signout {user.displayName}
            </Button>
        </>
    )
}