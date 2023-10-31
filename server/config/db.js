const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
    console.log(`MongoDB connected:${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB
