const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const { upload } = require("../cloudinary");

router.route("/:chatId")
    .post(upload.single("file"), sendMessage)
    .get(getMessages);

module.exports = router;
