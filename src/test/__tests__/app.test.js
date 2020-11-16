import React from "react"
import App from "../../components/app"

import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

describe("Main App Components Testing", () => {
    
    test("App main components test", () => {
        const appWrapper = shallow(<App />)
        expect(appWrapper.find('FavoritesContextProvider').exists()).toEqual(true)
        expect(appWrapper.find('AuthProvider').exists()).toEqual(true)
        expect(appWrapper.find('NavBar').exists()).toEqual(true)
        expect(appWrapper.find('Routes').exists()).toEqual(true)
    })
})

