const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

router.post("/signup",async (req, res)=>{
    const newUser = new User({
        fullName: req.body.fullName,
        enrollment: req.body.enrollment,
        email: req.body.email,
        sem: req.body.sem,
        branch:req.body.branch,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log(res.statusCode);
    }
    catch(err){
        res.status(500).json(err);
    } 
});


router.post("/login", async (req, res)=>{
    try {
        const user = await User.findOne({enrollment: req.body.enrollment,});
        !user && res.status(401).json("Wrong enrollment!");

        const hashesPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
       
        const originalPassword = hashesPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("Wrong pass!");

        const {password, ...other} = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router