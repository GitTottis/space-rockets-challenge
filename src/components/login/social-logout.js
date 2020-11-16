import React from 'react';
import { useUserContext } from "../../contexts/auth-context";
import { useFavoritesContext } from "../../contexts/favorites-context";
import { Button } from "@chakra-ui/core";
import firebase from "firebase";
import { write } from "../../firebase/firestore";
import Notification, { ALERT_STATUSES, getNotificationData }  from "../notification";


export default function Logout() {

    const { user } = useUserContext()
    const favourites = useFavoritesContext()
    const [ notificationData, setNotificationData ] = React.useState({})

    const logout = () => {
        if ( !!user ) {
            // First write to Firestore the selected Favorites
            write(favourites, user)
                .then(()=> {
                    firebase.auth()
                        .signOut()
                        .catch(function(error) {
                            throw new Error({
                                message: error.message,
                                code: error.code
                            });
                        });
                })
                .catch( error => {
                    if (Object.keys(notificationData).length === 0) 
                        setNotificationData(
                            getNotificationData(
                                ALERT_STATUSES.error, error.message, 5000
                            )
                        )
                    })
        } else {
            console.log('No Favourites')
        }
    }

    return (
        <>
            { !!notificationData && Object.keys(notificationData).length > 0 ?
                <Notification 
                    status={notificationData.status} 
                    message={notificationData.message} 
                    showtime={notificationData.showTime} 
                /> : null
            }
            { user ?
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
                    Signout
                </Button> :
                null
            }
            
        </>
    )
}