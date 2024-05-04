const express = require("express")
const app = express()
const cors = require("cors")
const connection = require("./Databse")
const bodyParser = require("body-parser")
const port = process.env.PORT || 3001

require('dotenv').config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())
app.use("/api/user",require("./routes/user"))

app.get('/',(req,res)=>{
    res.status(200).json("Hello")
})


connection()

app.listen(port,()=>console.log("Listening on port = "+port))