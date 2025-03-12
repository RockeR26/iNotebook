const express= require("express");
const { body, validationResult } = require('express-validator');
const Router=express.Router();
const User = require("../Models/User");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");
const fetchUser=require("../middleware/fetchuser")





// 1. (/api/auth/signup) Route to signup new user , no auth needed
Router.post("/signup",[
    
    //validating data for new user signup
    body('name',"Enter your full name").isLength({min:3}),
    body('email',"Enter valid email").isEmail(),
    body('password',"Minimum length is 6").isLength({min:6}),

    
],async(req,res)=>{
    // validation checks for the data
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        //find the existing email to avoid duplicate
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({errors:"Sorry a user with this email already exists"})
        }
        
        //creating hash and salt for password
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(req.body.password,salt);

        //User create in DB
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hash
          });
        
        //Creating auth token after signup 
        const authToken=jwt.sign({userid:user.id},process.env.SECRET_KEY)
          res.json(authToken);

    } catch (err){
        // catching the internal server errors
        console.log(err);
        res.json({error:"Internal server error",message:err.message});        
    }   
});


// 2. (/api/auth/login) Route to login new user , no auth needed
Router.post("/login",[
    
    //validating data for new user signup
    body('email',"Enter valid email").isEmail(),
    body('password',"Password should not blank").isLength({min:1}),

    
],async(req,res)=>{
    // validation checks for the data
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        //find the existing email to login user
        let user=await User.findOne({email:req.body.email});
        let checkPass=await bcrypt.compare(req.body.password,user.password);
        if((!user)||(!checkPass)){
            return res.status(400).json({errors:"Invalid Credentials"})
        }

        //if all the conditions are met then auth token is created
        const authToken=jwt.sign({userid:user.id},process.env.SECRET_KEY)
          res.json(authToken);

    } catch (err){
        // catching the internal server errors
        console.log(err);
        res.json({error:"Internal server error",message:err.message});        
    }   
});



// 3. (/api/auth/getuser) Route to get a user , auth needed
Router.post("/getuser",fetchUser,async(req,res)=>{

//getting user id from middleware fetchUser    
try {
    let userid=req.user.userid;
    const user=await User.findById(userid).select("-password");
    res.send(user);


} catch (err) {
    console.log(err);
    res.json({error:"Internal server error",message:err.message}); 
}

});



module.exports=Router;
