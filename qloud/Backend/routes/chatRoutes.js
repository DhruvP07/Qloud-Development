const express = require("express");
const router = express.Router();
const { getUserChats, createChat, getChatDetails, addUserToGroup, removeUserFromGroup }
    = require("../controllers/chatControllers");
const { upload } = require("../cloudinary");

router.route("/").get(getUserChats).post(upload.single("file"), createChat);
router.get("/:chatId", getChatDetails);
router.post("/:chatId/add-user", addUserToGroup);
router.post("/:chatId/remove-user", removeUserFromGroup);

module.exports = router;
