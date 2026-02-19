import express from "express"
import ContactRoutes from "./routes/contacts.routes.js"
import { connectDB } from "./config/database.js"
const app = express()


const PORT = process.env.PORT  || 4000;
//Database 
connectDB()

// Middleware
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use("/", ContactRoutes)

//Listen Port
app.listen(PORT,()=>{
    console.log(`Server is Started Successfully On Port: ${PORT}.`)
})

