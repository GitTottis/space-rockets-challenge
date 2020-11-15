
import MockFirebase from "mock-cloud-firestore";
import { fixtureData } from "../__mocks__/data";

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });


const firestore = () => {
    return {
        collection: (collectionName) => {
            return {
                doc: (docId) => {
                    return {
                        set: (data, options) => {
                            return new Promise( (resolve) => {
                                resolve(data)
                            }) 
                        },
                        get: () => {
                            return new Promise( (resolve) => {
                                resolve(
                                    fixtureData
                                        .__collection__[collectionName]
                                        .__doc__[docId]
                                )
                            })
                        },
                    }
                }
            }
        }
    }
}

const firebase = {
    firestore: firestore,
    initializeApp: jest.fn()
}

export default firebase
