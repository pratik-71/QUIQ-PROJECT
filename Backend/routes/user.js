const express = require("express");
const { Verify_token } = require("../Middlewares/Verify_token");
const { add_user, get_user, get_profile } = require("../Controllers/Auth");
const router = express.Router(); 

// Routes that require authentication middleware
router.get("/getuser", Verify_token, get_user);
router.get("/user_info", Verify_token, get_user);

// Route for fetching user profile by name
router.get("/:name", get_profile);

// Route for adding a new user
router.post("/adduser", add_user);

module.exports = router;
