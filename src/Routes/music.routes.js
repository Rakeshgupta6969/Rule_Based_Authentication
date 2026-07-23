const express = require("express");
const  musicController = require("../Controller/music.Controller");
const multer = require("multer");
const authMiddleware = require("../Middleware/auth.middleware");

const upload = multer({
    storage:multer.memoryStorage()
});


const router = express.Router();

router.post("/upload",authMiddleware.authArtist, upload.single("music") ,musicController.createMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);
router.get("/getMusic",authMiddleware.authUser,musicController.getAllMusic);
router.get("/getAlbum",authMiddleware.authUser,musicController.getAlbum);
router.get("/albums/:albumId",authMiddleware.authUser,musicController.getAlbumById);

module.exports  = router;