const { Router } = require('express')

const router = Router()

const calendarController = require('../controllers/calenderController')



router.route('/initGoogleCalender')
    .post(calendarController.initGoogleCalender)

router.route('/createEventsInGoogleCalenderView')
    .post(calendarController.addEventsInCalender)

router.route('/getCalenderView')
    .get(calendarController.getCalenderView)

module.exports = router