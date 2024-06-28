import express from 'express'
import mongoose from 'mongoose'

const app = express()

// Mongo Databse Connection to the server
const MONGO_URL = "mongodb+srv://blogApp:blogApp_database@cluster0.up3riz0.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0"
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(() => app.listen(5000))
    .then(() => {
        console.log("Server Running Successfully")
    })
    .catch((err) => console.log(err))
// DataBase Connection code ends here

app.use('/api', (req, res, next) => {
    res.status(200).send("hello World")
})
