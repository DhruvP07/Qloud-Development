const express = require("express");
const router = express.Router();
const { getUserChats, createChat, getChatDetails, addUserToGroup, removeUserFromGroup }
    = require("../controllers/chatControllers");
const { upload } = require("../cloudinary");
const { getJoinRequests, joinCommunity, leaveCommunity, handleJoinRequest, getCommunities } 
    = require("../controllers/communityControllers");

router.route("/").get(getUserChats).post(upload.single("file"), createChat);
router.get("/search", getCommunities);
router.get("/:chatId", getChatDetails);
router.post("/:chatId/join", joinCommunity);
router.post("/:chatId/add-user", addUserToGroup);
router.post("/:chatId/remove-user", removeUserFromGroup);
router.post("/:chatId/leave", leaveCommunity);
router.route("/:chatId/requests").get(getJoinRequests).post(handleJoinRequest); 

module.exports = router;
