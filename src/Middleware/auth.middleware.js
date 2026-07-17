const jwt = require("jsonwebtoken");
require("dotenv").config();



async function authArtist(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorized",
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role != "artist"){
            return res.status(403).json({
                message:"you have not access(forbidden error)",
            })
        }
        req.user = decoded;
        next();
    }
    catch (error){
        console.log("error",error);
         return res.status(401).json({
            message:"unauthorized"
         })
    }
}

async function authUser(req,res,next){
    const token  = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.role != "user" && decoded.role != "artist"){
        return res.status(401).json({
            message:"unauthorized,you don't have access",
        })
    } 
    req.user = decoded;
    next();  
    }
    catch (error){
        console.log("error:",error);
        return res.status(401).json({
            message:"unauthorized,here may be token is not of a authenticated user",
        })
    }
}
module.exports = {authArtist,authUser};