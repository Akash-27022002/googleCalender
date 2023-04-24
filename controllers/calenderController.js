const { google } = require('googleapis')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } = require('../configs/config')
const { sendResponse, setResponse } = require('../Response/response')


const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URL
)

const initGoogleCalender = async (req, res) => {
    try {
        const { code } = req.body
        const response = await oauth2Client.getToken(code)
        return sendResponse(res, setResponse(200, response))
    } catch (error) {
        return sendResponse(res, setResponse(500, { error: error.message }))
    }
}

const getCalenderView = async (req, res) => {
    try {
        // set credentials to oauth2Client
        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

        const calender = google.calendar('v3')
        const result = await calender.events.list({
            auth: oauth2Client,
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
        })
        const events = result.data.items;
        if (!events || events.length === 0) {
            return sendResponse(res, setResponse(200, { message: 'No upcoming events found.' }))
        }
        return sendResponse(res, setResponse(200, events))
    } catch (error) {
        return sendResponse(res, setResponse(500, { error: error.message }))
    }
}

const addEventsInCalender = async (req, res) => {
    try {
        const { summary, description, location, startDataTime, endDateTime } = req.body
        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
        const calender = google.calendar('v3')
        console.log(req.body)
        const response = await calender.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            requestBody: {
                summary: summary,
                description: description,
                location: location,
                colorId: '7',
                start: {
                    dateTime: new Date(startDataTime)
                },
                end: {
                    dateTime: new Date(endDateTime)
                }
            }
        })
        return sendResponse(res, setResponse(200, response))
    } catch (error) {
        return sendResponse(res, setResponse(500, { error: error.message }))
    }
}

module.exports = {
    initGoogleCalender,
    getCalenderView,
    addEventsInCalender
}
