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
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log("Signed out OK. Redirected to Home")
              }).catch(function(error) {
                // An error happened.
                console.log("Error ",error)
              });
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