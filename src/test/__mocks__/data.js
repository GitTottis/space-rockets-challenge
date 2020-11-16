const getNow = new Date(1572393601200);
export const getDate = jest.fn( () => getNow)



export const fixtureData = {
    __collection__: {
        "favourites": {
            __doc__: {
                '123098asdlkj120398': {
                    90: {
                            crew: null,
                            details: "Test Launch",
                            flight_number: 90,
                            mission_name: "Test Launch",
                            type: "launch"
                        }
                }
            }
        }
    }
}


export const mockUser = { uid: "123098asdlkj120398"}
export const mockLaunch = { 100: {id: 100, type: 'launch'}}

export const mockOKNotification = { status: "success", message: "Everything is fine", showtime: 2000 }
export const mockErrorNotification = { status: "error", message: "Ooops", showtime: 4000 }