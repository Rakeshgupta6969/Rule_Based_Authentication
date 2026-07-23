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

async function getAllMusic(req,res){
    // const musics = await  musicModel.find().populate("artist"); //this give details of the  all musics along with details of their artist
    // const musics = await  musicModel.find().populate("artist","username email");
    const musics = await  musicModel.find()
    .skip(1) // means skip the first unit of the musics and then send rest of the musics
    .limit(10); // here meaning of the limit is you can only get at max 10 (if available on the database) music at a time
    if(!musics){
        return res.status(403).json({
            message:"musics is not found",
        })
    }
    res.status(200).json({
        message:"all musics get successfully",
        musics:musics,
    })
}

async function getAlbum(req,res){
     // const album = await albumModel.find();
    // const album = await albumModel.find().populate("artist","username email");
    // const album = await albumModel.find().populate("artist","username email").populate("musics");
    const album = await albumModel.find().select("title artist").populate("artist","username email");
    if(!album){
        return res.status(403).json({
            message:"Album is not found",
        })
    }
    res.status(200).json({
        message:"albums are the fetched successfully",
        album:album
    })
    
}

async function getAlbumById(req,res){
    const AlbumId  = req.params.AlbumId;
    const albums = await albumModel.findOne(AlbumId).populate("artist","email username").populate("musics");
    res.status(200).json({
        message:"albums fetched successfully",
        albums: albums
    })
}
module.exports = { createMusic, createAlbum, getAllMusic,getAlbum,getAlbumById};