const Chat = require("../models/Chat");

// Get Communities
const getCommunities = async (req, res) => {
    try {
        const communities = await Chat.find({
            type: "community"
        }).populate("participants").select("-joinRequests");

        res.status(200).json({ success: true, communities });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Join a public community or request to join a private one
const joinCommunity = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        const community = await Chat.findById(chatId);
        if (!community || community.type !== "community") {
            return res.status(404).json({ success: false, message: "Community not found" });
        }

        if (community.participants.includes(userId)) {
            return res.status(400).json({ success: false, message: "Already a member" });
        }

        if (community.isPublic) {
            community.participants.push(userId);
            await community.save();
            return res.status(200).json({ success: true, message: "Joined community" });
        }

        // Private - check if already requested
        if (community.joinRequests?.includes(userId)) {
            return res.status(400).json({ success: false, message: "Already requested to join" });
        }

        community.joinRequests = community.joinRequests || [];
        community.joinRequests.push(userId);
        await community.save();
        res.status(200).json({ success: true, message: "Request sent" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Leave a community
const leaveCommunity = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        const community = await Chat.findById(chatId);
        if (!community || community.type !== "community") {
            return res.status(404).json({ success: false, message: "Community not found" });
        }

        if (community.admin.toString() === userId) {
            return res.status(400).json({ success: false, message: "Admin cannot leave the community" });
        }

        if (!community.participants.includes(userId)){
            return res.status(400).json({ success: false, message: "Not a member" });
        }
        community.participants = community.participants.filter(id => id.toString() !== userId);

        await community.save();
        res.status(200).json({ success: true, message: "Left community" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get all join requests (admin only)
const getJoinRequests = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        const community = await Chat.findById(chatId).populate("joinRequests");

        if (!community || community.type !== "community") {
            return res.status(404).json({ success: false, message: "Community not found" });
        }

        if (community.admin.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Only admin can view join requests" });
        }

        res.status(200).json({ success: true, requests: community.joinRequests });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Approve or Reject a join request (admin only)
const handleJoinRequest = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { userId, status } = req.body; // status should be "approve" or "reject"
        const adminId = req.user._id;

        if (!userId || !["approve", "reject"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        const community = await Chat.findById(chatId);

        if (!community || community.type !== "community") {
            return res.status(404).json({ success: false, message: "Community not found" });
        }

        if (community.admin.toString() !== adminId) {
            return res.status(403).json({ success: false, message: "Only admin can handle requests" });
        }

        if (!community.joinRequests.includes(userId)) {
            return res.status(400).json({ success: false, message: "User has not requested to join" });
        }

        // Remove from joinRequests
        community.joinRequests = community.joinRequests.filter(id => id.toString() !== userId);

        // If approved, add to participants
        if (status === "approve") {
            community.participants.push(userId);
        }

        await community.save();

        res.status(200).json({
            success: true,
            message: `User ${status}d`,
            community,
        });

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    getCommunities,
    joinCommunity,
    leaveCommunity,
    getJoinRequests,
    handleJoinRequest
};
