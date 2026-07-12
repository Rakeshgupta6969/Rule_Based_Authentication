const imageKit = require('@imagekit/nodejs');
require("dotenv").config();


const imageKitClient = new imageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
     const result = await imageKitClient.files.upload({
      file,
      fileName : "Music" + Date.now(),
      folder : "Backend/music"
     }) 
     return result;
}

module.exports = {uploadFile};