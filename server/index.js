require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const { logger, logEvents } = require('./middleware/logger')  
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const colors = require('colors');  
PORT = process.env.PORT || 5000 
console.log(process.env.NODE_ENV)

 
// connect to database
connectDB();

// cors
app.use(cors(corsOptions));

// Express 
app.use(express.json())

 
// backend welcome message
app.get("/", (req, res) => {
    res.json("Hello"); 
   
})
 
// Route files
const auth = require('./routes/auth');

//mount routers
app.use('/api/v1/auth', auth);

// connection
mongoose.connection.once('open', () => {
   
    app.listen(PORT, () => console.log(`Server running on port ${PORT}` .yellow.bold))
  })
  
  mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
  })  