const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["one-on-one", "group"],
            required: true,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true,
            },
        ],
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Only for group chats
        },
        name: {
            type: String,
            default: null,
        },
        icon: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
