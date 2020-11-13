import { formatDate, formatDateTime } from "../../utils/format-date"
import { getDate } from "../__mocks__/data"

describe("Utility Functions Testing", () => {
    test('formatDate() on custom date', () => {
        const utilDate = formatDate(getDate())
        expect(utilDate).toEqual("Wednesday, October 30, 2019")
    });

    test('formatDateTime test on custom date', () => {
        const utilDate = formatDateTime(getDate(), "en-US", "UTC")
        expect(utilDate).toEqual("October 30, 2019, 12:00:01 AM UTC")
    });
})
