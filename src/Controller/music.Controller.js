const musicModel = require("../Models/music.Models");
const {uploadFile} = require("../Services/Storage.Services");
const userModel  = require("./user.Controller");
const albumModel = require("../Models/album.Models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createMusic(req,res){
    try{
    const title = req.body.title;
    const file = req.file;
    const result = await uploadFile(file.buffer.toString('base64'));
    
    const music = await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id
    })
    
    res.status(201).json({
        message:"music is created successfully",
        id:music._id,
        title:music.title,
        uri:music.uri,
        artist:music.artist
    })

    }
    catch (error){
      return res.status(401).json({
            message:"unauthorized",
        })
    }
}

async function createAlbum(req,res){
    try{
        const {title,musicId} = req.body;
        const album = await albumModel.create({
            title,
            musics:musicId,
            artist:req.user.id
           
        })
        res.status(201).json({
            message:"Album is created successfully",
            album:{
               id:album._id,
               title:album.title,
               music:album.musics,
               artist:album.artist
            }
        })

    }
    catch(error){
        res.status(401).json({
            message:"unauthorized"
        })
    }
}
module.exports = { createMusic,createAlbum };