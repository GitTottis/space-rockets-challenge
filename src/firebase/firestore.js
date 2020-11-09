import firebase from "firebase"

const DOC_NAME = 'favourites'

export const write = (data, user) => {
    console.log("User: " + user + " writes into " + COLLECTION_NAME)
    firebase.firestore()
        .collection(user.uid)
        .doc(DOC_NAME)
        .add({...data})
}

export function read(user) {
    console.log("User: " + { user } + " reads " + COLLECTION_NAME)
    firebase.firestore().collection(COLLECTION_NAME)
        .onSnapshot( snapshot => {
            const favorites = []
            snapshot.forEach( favorite => favorites.push( favorite ))
            return favorites
        }
    )
}

