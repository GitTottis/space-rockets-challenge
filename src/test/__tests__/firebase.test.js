import firebase from "../__mocks__/firebase";
import { mockUser } from "../__mocks__/data";
import { read, write } from "../../firebase/firestore";

describe("Firebase Functionality Testing", () => {
    afterAll(() => {
        global.firebase = require('firebase')
    });

    const launchData = {
        90: {
                crew: null,
                details: "Test Launch",
                flight_number: 90,
                mission_name: "Test Launch",
                type: "launch"
            }
    }

    test("Initialize Once", () => {
        firebase.initializeApp()
        expect(firebase.initializeApp).toHaveBeenCalled()
    })

    test("Set data to Firestore", () => {
        return write(launchData, mockUser).then( doc => {
            expect(doc).not.toBe(null);
            expect(doc).toStrictEqual(launchData);
        });
    })

    test("Read data to Firestore", () => {
        const readRef = read( mockUser )
        readRef.then(doc => {
            expect(doc).not.toBe(null);
            expect(doc).toStrictEqual(launchData);
        });
    })



})

