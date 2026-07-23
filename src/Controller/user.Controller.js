const userModel = require("../Models/User.Models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt  = require("bcryptjs");


async function userRegister(req,res){
     const {username,email,password,role = "user"} = req.body;
     const isUserAlreadyExists = await userModel.findOne(
        {
        //   username,  here should be the both condition true at same time
        //   email, if user exist same email as well same username then return true,otherwise false

          
         // this condition check if any condition true return true
         // that means if any user exits with one of the of the same username or same email or both then return true
         $or:[ 
            {username},
            {email}
        ],
        }
     )

     if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user is already exists with the same credential",
        });
     }

     const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password:hash,
        role
     });
     
     const token  = jwt.sign(
      {
       id:user._id,
       role:user.role
      },
      process.env.JWT_SECRET
     );
    
     res.cookie("token",token);
     res.status(201).json({
      message: "user registered successfully",
      user:{
         id:user._id,
         username:user.username,
         email:user.email,
         password:user.password,
         role:user.role,
      }
     })
}

async function userLogin(req,res){
   const {username,email,password} = req.body;
   const user = await userModel.findOne({
     $or:[
      {email},
      {username}
     ]
   })
   if(!user){
      res.status(401).json({
         message:"Invalid credential",
      })
   }
   const isValidPassword = await bcrypt.compare(password,user.password);
   if(!isValidPassword){
      res.status(401).json({
         message:"Invalid credential",
      })
   }

   const token = jwt.sign({
      id:user._id,
      role:user.role
   },process.env.JWT_SECRET);
   
   res.cookie("token",token);


   res.status(200).json({
      message:"user loggedIn successfully",
      user:{
         username:user.username,
         email:user.email,
         password:user.password,
         role:user.role
      }
   })

}

async function userLogout(req,res){
   res.clearCookie("token");
   res.status(200).json({
      message:"user is logout successfully"
   })
}
module.exports = {userRegister,userLogin,userLogout};