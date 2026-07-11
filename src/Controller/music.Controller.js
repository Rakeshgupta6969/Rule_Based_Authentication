const musicModel = require("../Models/music.Models");
const userModel  = require("./user.Controller");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createMusic(req,res){
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
            message:"you don't have access to create music",
        })
      }
    //  const artist = await userModel.findOne({
    //     _id:decoded.id
    //  })

    }
    catch (error){
      return res.status(401).json({
            message:"unauthorized",
        })
    }
}