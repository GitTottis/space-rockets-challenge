import firebase from "firebase"


const COLLECTION_NAME = 'favourites'

export function write (data, user) {
    return firebase.firestore()
            .collection(COLLECTION_NAME)
            .doc(user.uid)
            .set({...data}, {merge: true})
}

// Returns a Firestore DOC
export function read(user) {
    return firebase.firestore()
            .doc(user.uid)
            .get();
}
