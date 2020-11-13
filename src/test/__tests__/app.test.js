import React from "react"
import App from "../../components/app"
import Navbar from "../../components/navbar"

import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

describe("Main App Components Testing", () => {


    test("Hello Testing", () => {
        expect(true).toBe(true)
    })

    test("App test", () => {
        const appWrapper = shallow(<App />)
        appWrapper.debug()
    })

    test("Navbar test", () => {
        const appWrapper = shallow(<Navbar />)
        appWrapper.debug()
    })

})

