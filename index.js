const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGOOSE_URL).then(()=>console.log("DB IS CONNECTION SUCCESSFULL")).catch((e)=> console.log(e));

app.get('/', (req, res) => {
    res.send("Welcome!")
});

app.use("/user", authRoute);

app.listen(process.env.PORT,()=>{
    console.log("server is running");
});