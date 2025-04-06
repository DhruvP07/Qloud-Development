const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        content: {
            type: String,
        },
        file: {
            url: String,
            fileType: String,
            size: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
