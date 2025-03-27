const express = require('express');
const { 
    handleBusinessPersonSignup, 
    handleBusinessPersonSignin, 
    handleBusinessPersonforgotPassword, 
    handlebusinessPersonResetPassword,
    selectBusiness,
    updateBusinessProfile,
    updateBusinessSocialLinks,
    updateProfilePicture,
    updateBusinessStats,
    addTeamMember,
    removeTeamMember,
    followBusinessPerson,
    unfollowBusinessPerson,
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    getConnectionRequests,
    removeConnection,
    getFollowers,
    getFollowing,
    getConnections
} = require('../controllers/businessControllers');

const { authenticateUser } = require('../middlewares/authentication'); // Middleware to authenticate users

const router = express.Router();

// Authentication routes
router.post('/signup', handleBusinessPersonSignup);
router.post('/signin', handleBusinessPersonSignin);
router.post('/forgot-password', handleBusinessPersonforgotPassword);
router.post('/reset-password/:id/:token', handlebusinessPersonResetPassword);

// Business profile and selection
router.post('/select-business', authenticateUser, selectBusiness);
router.put('/update-profile', authenticateUser, updateBusinessProfile);
router.put('/update-social-links', authenticateUser, updateBusinessSocialLinks);
router.put('/update-profile-picture', authenticateUser, updateProfilePicture);
router.put('/update-business-stats', authenticateUser, updateBusinessStats);

// Team management
router.post('/add-team-member', authenticateUser, addTeamMember);
router.delete('/remove-team-member', authenticateUser, removeTeamMember);

// Follow & Unfollow routes
router.post('/follow', authenticateUser, followBusinessPerson);
router.post('/unfollow', authenticateUser, unfollowBusinessPerson);

// Connection management
router.post('/connect', authenticateUser, sendConnectionRequest); // Send connection request
router.post('/accept-connection', authenticateUser, acceptConnectionRequest); // Accept connection request
router.post('/decline-connection', authenticateUser, declineConnectionRequest); // Decline connection request
router.get('/connection-requests', authenticateUser, getConnectionRequests); // List all connection requests
router.delete('/disconnect', authenticateUser, removeConnection); // Remove an existing connection

// Followers & Connections
router.get('/followers', authenticateUser, getFollowers);
router.get('/followings', authenticateUser, getFollowing);
router.get('/connections', authenticateUser, getConnections);

module.exports = router;
