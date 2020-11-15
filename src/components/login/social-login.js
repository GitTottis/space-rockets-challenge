import React from 'react';
import { useUserContext } from "../../contexts/auth-context";
import { useFavoritesUpdateContext } from "../../contexts/favorites-context";
import { Button } from "@chakra-ui/core";
import { getAuthProvider } from "../../firebase/firebase-app";
import { read } from  "../../firebase/firestore";
import firebase from "firebase";
import { ACTIONS } from "../../contexts/favorites-context";
import Notification, { ALERT_STATUSES, getNotificationData }  from "../notification";

export default function Login({ type }) {

    const { user } = useUserContext()
    const setFavourites = useFavoritesUpdateContext()
    const [ notificationData, setNotificationData ] = React.useState({})

    // React.useEffect(() => {
    //     setNotificationData(notificationData)
    // },[notificationData])

    const loginWithSocial = () => {
        
        if ( !user ) {
            var provider = getAuthProvider(type)

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                // The signed-in user info.
                var currentUser = result.user;
                setNotificationData(
                    getNotificationData(
                        ALERT_STATUSES.ok, 'Hello '+ result.user.displayName, 2000
                    )
                )
                // When singing in we must read if the user has any favorites in Firestore. 
                read(currentUser).then( doc => {
                    if(doc.exists) {setFavourites({ "type": ACTIONS.INIT_FAVORITES, payload: {...doc.data()} })}
                }).catch( error => {
                    throw new Error({
                        message: error.message,
                        code: error.code
                    });
                })
            }).catch( error => {
                if (Object.keys(notificationData).length === 0) 
                    setNotificationData(
                        getNotificationData(
                            ALERT_STATUSES.error, error.message, 5000
                        )
                    )
            });
        }
    }
 
    return (
           <>   
                { !!{notificationData} && Object.keys({notificationData}).length > 0 ?
                    <Notification 
                        status={notificationData.status} 
                        message={notificationData.message} 
                        showtime={notificationData.showTime} 
                    /> : null
                }
                { !user ? 
                    <Button variantColor="teal" variant="outline" size="lg" textAlign="center" onClick={loginWithSocial}>
                        { type === 'google' ? 'Google' : 'Facebook' }
                    </Button> : null
                }
            </>
        )
}
