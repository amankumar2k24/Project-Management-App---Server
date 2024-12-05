import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// ROUTE IMPORTS 

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(express.json())
app.use(morgan("common"))

// ROUTES
app.get("/", (req,res)=>{
    res.send("This is home route")
})

// SERVER
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
console.log("Server is running on port", PORT)  
})