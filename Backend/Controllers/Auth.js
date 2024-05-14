const User = require("../Models/User_model");

const add_user = async (req, res) => {
    
    try {
        const { name, email,bio, phone_number, country, gender,uid, profile_photo,cover_photo } = req.body;
        const user = new User({
            name: name,
            email: email,
            phone_number: phone_number,
            uid: uid,
            bio:bio,
            country: country,
            gender: gender,
            profile_photo: profile_photo,
            cover_photo: cover_photo
        });

        const savedUser = await user.save();

        res.status(201).json({ user: savedUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ success: false, message: 'Failed to add user' });
    }
};


const get_user = async (req, res) => {
    const uid = req.user;
    console.log("uid = ", uid);
    try {
        const data = await User.findOne({ uid: uid });
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log("Error thrown:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const get_profile=async(req,res)=>{
    const name = req.params.name
    try {
        const data = await User.findOne({name:name}).select("name country profile_photo cover_photo bio")
        if(data){
            return res.status(200).json(data)
        }
     } catch (error) {
        return res.status(400).json({error:"No user Found"})
     }
}


const update_user = async (req, res) => {
    try {
        const uid = req.user
        const { bio, country, gender, profile_photo, cover_photo } = req.body;

        const user = await User.findOne({ uid });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.bio = bio;
        user.country = country;
        user.gender = gender;
        user.profile_photo = profile_photo;
        user.cover_photo = cover_photo;

        const savedUser = await user.save();

        res.status(200).json({ success: true, user: savedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Failed to update user' });
    }
};


module.exports = { add_user,get_user,get_profile,update_user };
