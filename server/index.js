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

// Set up CORS
const corsOptions = {
    origin: "https://woka-app-frontend.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Methods", corsOptions.methods.join(","));
    res.header("Access-Control-Allow-Credentials", corsOptions.credentials);
    next();
  });
app.use(express.json())

// mongoose.connect('mongodb+srv://yousaf:test123@cluster0.g4i5dey.mongodb.net/test?retryWrites=true&w=majority');


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