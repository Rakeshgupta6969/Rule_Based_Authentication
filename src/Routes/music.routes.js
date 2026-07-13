const express = require("express");
const  musicController = require("../Controller/music.Controller");
const multer = require("multer");

const upload = multer({
    storage:multer.memoryStorage()
});


const router = express.Router();

router.post("/upload", upload.single("music") ,musicController.createMusic);
router.post("/album",musicController.createAlbum);

module.exports  = router;