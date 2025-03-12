//imports
const jwt=require("jsonwebtoken");

//function to  verify and decode jwt to get user id from the auth token
const fetchUser=(req,res,next)=>{
    //auth-token should pass from header by client
    const token=req.header("auth-token");
    if(!token){
        res.status(401).json({error:"Unauthorized Token"}); 
    }
    try {
        //verfying token 
        const data=jwt.verify(token,process.env.SECRET_KEY);
        req.user=data;
        next();

    } catch (error) {
     res.status(401).json({error:"Unauthorized Token",message:err.message})   
    }
   
}

module.exports = fetchUser;