const MeetModel = require('../models/meet.js')
const jwt = require('jsonwebtoken')
const checkAuthToken = require('../middleware/checkToken.js')

class MeetController {

    static studentLogin = async(req,res)=>{
        
        const { name,email,password,slot} = req.body
        
        if(name==='student1'||name==='student2')
        {
            if(email&&password)
            {
                try {
                    const bookSlot = new MeetModel({
                        name : name,
                        email : email,
                        password : password,
                        slot : slot
                    })
                     await bookSlot.save()
                      
                      const saved_user = await MeetModel.findOne({ email: email })
                      const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                      res.status(201).send({ "status": "success", "message": "token issued", "token": token })

                } catch (error) {
                    res.send({"status": "failed", "message": "unable to book slot pls enter correct slot available slots are 1pm-2pm, 4pm-5pm ,6pm-7pm"})
                }

            }
            else{
                res.send({"status": "failed", "message": "All fields are required"})
            }
        }
        else
        {
            res.send({"status": "failed", "message": "Unauthorized user"})
        }
    }

    static alumniLogin = async(req,res)=>{
        const {name,email,password} = req.body
        if(name === 'alumni')
        {
            if(email&&password)
            {
                res.send({'students':req.user})
            }
            else
            {
                res.send('All fields are required')
            }
        }else
        {
            res.send('unauthorized user')
        }
    }

}

module.exports = MeetController