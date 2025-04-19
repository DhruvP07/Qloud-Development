const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["one-on-one", "group", "community"],
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
            ref: "users",
        },
        name: {
            type: String,
            default: null,
        },
        icon: {
            type: String,
            default: null,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        joinRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
