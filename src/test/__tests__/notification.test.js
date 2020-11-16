import React from "react"
import Notification from "../../components/notification"
import { mockOKNotification, mockErrorNotification } from "../__mocks__/data";

import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
configure({ adapter: new Adapter() })

describe("Notifications Component Testing", () => {
    test("Mock Success Notification", () => {
        const notificationWrapper = shallow(
            <Notification 
                status={mockOKNotification.status} 
                message={mockOKNotification.message} 
                showtime={mockOKNotification.showTime} 
        />)

        const props = notificationWrapper.find('Alert').props()
        expect(props.status).toEqual('success')
    })

    test("Mock Error Notification", () => {
        const notificationWrapper = shallow(
            <Notification 
                status={mockErrorNotification.status} 
                message={mockErrorNotification.message} 
                showtime={mockErrorNotification.showTime} 
        />)

        const props = notificationWrapper.find('Alert').props()
        expect(props.status).toEqual('error')
    })
})

