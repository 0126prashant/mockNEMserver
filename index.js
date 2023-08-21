const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { appoinmentRouter } = require("./routes/appointment.routes")


const app = express()
app.use(express.json())
require("dotenv").config()
app.use(cors())

app.use("/users",userRouter)
app.use("/appointments",appoinmentRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`Port is Ruuning at ${process.env.PORT}`)
})