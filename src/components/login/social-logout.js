import React from 'react';
import { useUserContext, useSetUserContext } from "../../contexts/auth-context";
import { Button } from "@chakra-ui/core";
import firebase from "firebase";


export default function Logout() {

    const { user } = useUserContext()
    // const { setUser } = useSetUserContext()

    const logout = () => {
        if ( !!user ) {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log("Signed out OK. Redirected to Home")
                // setUser(null)
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