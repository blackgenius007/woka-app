require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const { logger, logEvents } = require('./middleware/logger')  
const app = express()
const cors = require('cors')
const colors = require('colors');  
PORT = process.env.PORT || 5000 
console.log(process.env.NODE_ENV)

 
// connect to database
connectDB();

app.use(cors(
    {
        origin: ["https://woka-app-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

// mongoose.connect('mongodb+srv://yousaf:test123@cluster0.g4i5dey.mongodb.net/test?retryWrites=true&w=majority');


app.get("/", (req, res) => {
    res.json("Hello"); 
   
})
 
// Route files
const auth = require('./routes/auth');


// connection
mongoose.connection.once('open', () => {
   
    app.listen(PORT, () => console.log(`Server running on port ${PORT}` .yellow.bold))
  })
  
  mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
  })  