const Chat = require("../models/Chat");

// Create a one-on-one or group chat
const createChat = async (req, res) => {
    try {
        let { type, participants, name } = req.body;
        const admin = req.user._id;
        let icon = req.file ? `/uploads/${req.file.filename}` : null;

        if (!type) {
            type = "one-on-one";
        }

        if (!participants || !participants.length)
            return res.status(400).json({ success: false, message: "Participants are required" });

        if (type === "group" && !name)
            return res.status(400).json({ success: false, message: "Group name is required" });

        // Ensure admin is part of participants
        if (!participants.includes(admin)) {
            participants.push(admin);
        }

        if (type === "one-on-one") {
            const existingChat = await Chat.findOne({
                type: "one-on-one",
                participants: { $all: participants, $size: 2 },
            });

            if (existingChat) return res.status(200).json({ success: true, chat: existingChat });

            if (participants.length > 2)
                return res.status(400).json({
                    success: false,
                    message: "Only two users can exist in an one-on-one chat"
                });

            name = null;
            icon = null;
        }

        const chat = new Chat({ type, participants, admin, name, icon });
        await chat.save();
        res.status(201).json({ success: true, chat });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get chat details
const getChatDetails = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId).populate("participants");
        if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });

        res.status(200).json({ success: true, chat });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get all chats for the current user
const getUserChats = async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({
            participants: userId,
        }).populate("participants");

        res.status(200).json({ success: true, chats });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Add users to a group (admin only)
const addUserToGroup = async (req, res) => {
    try {
        const { userIds } = req.body;
        const { chatId } = req.params;

        if (!chatId || chatId === ":chatId")
            return res.status(400).json({ success: false, message: "Chat Id is required" });

        const chat = await Chat.findById(chatId);

        if (!chat || chat.type !== "group")
            return res.status(400).json({ success: false, message: "Group chat not found" });

        if (!userIds || !userIds.length)
            return res.status(400).json({ success: false, message: "At least one user is required" });

        if (!chat.admin.equals(req.user._id))
            return res.status(403).json({ success: false, message: "Only admin can add users" });

        // Filter out users who are already in the group
        const newUsers = userIds.filter(
            (id) => !chat.participants.includes(id)
        );

        chat.participants.push(...newUsers);
        await chat.save();

        res.status(200).json({ success: true, chat });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// Remove users from a group (admin only)
const removeUserFromGroup = async (req, res) => {
    try {
        const { userIds } = req.body;
        const { chatId } = req.params;

        if (!chatId || chatId === ":chatId")
            return res.status(400).json({ success: false, message: "Chat Id is required" });

        if (!userIds || !userIds.length) {
            return res.status(400).json({ success: false, message: "At least one user is required" });
        }

        const chat = await Chat.findById(chatId);

        if (!chat || chat.type !== "group") {
            return res.status(400).json({ success: false, message: "Group chat not found" });
        }

        if (!chat.admin.equals(req.user._id)) {
            return res.status(403).json({ success: false, message: "Only admin can remove users" });
        }

        chat.participants = chat.participants.filter(
            (id) => !userIds.includes(id.toString())
        );

        await chat.save();
        res.status(200).json({ success: true, chat });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};





module.exports = { getUserChats, createChat, getChatDetails, addUserToGroup, removeUserFromGroup }