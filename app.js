const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/connectDB.js')
const meetRoutes = require('./routes/meetRoutes.js')

app.use(express.json())
app.use('/api/user/', meetRoutes)



const port = process.env.PORT

const start = async () => {
    try {
      await connectDB(process.env.DATABASE_URL)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      )
    } catch (error) {
      console.log(error);
    }
  };
  
  start();