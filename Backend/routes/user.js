const express = require("express");
const { Verify_token } = require("../Middlewares/Verify_token");
const { add_user, get_user } = require("../Controllers/Auth");
const router = express.Router(); 

router.get("/getuser", Verify_token);
router.post("/adduser",add_user);
router.get("/user_info",Verify_token,get_user)  

module.exports = router;
