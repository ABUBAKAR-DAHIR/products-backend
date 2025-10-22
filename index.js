    import express from 'express'
    import mongoose  from 'mongoose'
    import { getUsersRoute } from './routes/User.routes.js'
    import cors from 'cors'

    const server = express()
    server.use(express.json())
    server.use(cors())

    mongoose.connect('mongodb+srv://abu112abu112abu112_db_user:Z9sEhJET80XJFRdx@cluster0.ocysjma.mongodb.net/').then(()=>{
        console.log("MongoDB connected ✅")
    }).catch((e)=>{
        console.log("error: " + e)
    })

    getUsersRoute(server)

    server.listen(5000, () => console.log("The server is running on http://localhost:5000"))

    // Z9sEhJET80XJFRdx
    // abu112abu112abu112_db_user

    // onsite & offline interview what would you prefer and why?