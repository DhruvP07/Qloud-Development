const Chat = require("../models/Chat");
const Message = require("../models/Message");

const sendMessage = async (req, res) => {
    try {
        const { _id: sender } = req.user;
        const { chatId } = req.params;
        const { content } = req.body;

        if ((!content || !content.trim()) && !req.file)
            return res.status(400).json({ success: false, message: "Message can't be empty" });

        // Check if user is part of the chat
        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });

        if (!chat.participants.includes(sender.toString())) {
            return res.status(403).json({ success: false, message: "Not a participant of this chat" });
        }

        let fileData = null;
        if (req.file) {
            fileData = {
                url: `/uploads/${req.file.filename}`,
                fileType: req.file.mimetype.split("/")[0], // "image", "application", etc.
                size: req.file.size,
            };
        }

        const message = new Message({ chatId, sender, content, file: fileData });
        await message.save();

        res.status(201).json({ sucess: true, message });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const getMessages = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { chatId } = req.params;

        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });

        if (!chat.participants.includes(userId.toString())) {
            return res.status(403).json({ success: false, message: "Not a participant of this chat" });
        }

        const messages = await Message.find({ chatId }).sort({ createdAt: -1 });
        res.status(200).json({ sucess: true, messages });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports = { getMessages, sendMessage }