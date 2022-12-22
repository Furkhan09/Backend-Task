const MeetController = require('../controllers/meetController.js')
const express = require('express')
const checkAuthToken = require('../middleware/checkToken.js')
const router = express.Router()

router.post('/login',MeetController.studentLogin)

router.post('/alumni',checkAuthToken,MeetController.alumniLogin)

module.exports = router