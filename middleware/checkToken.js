const jwt = require('jsonwebtoken')
const MeetModel = require('../models/meet.js')

const checkAuthToken = async(req,res,next)=>{
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

      // Get User from Token
      req.user = await MeetModel.findById(userID).select('-password -email')
      await MeetModel.findByIdAndUpdate(req.user._id, { $set: {option : 'confirm'} })
       next()
       
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized token" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

module.exports = checkAuthToken