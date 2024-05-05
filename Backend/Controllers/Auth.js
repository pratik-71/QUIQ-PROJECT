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

const get_user = async(req,res)=>{
    const uid = req.user
     try {
        const data = await User.findOne({uid:uid})
        if(data){
            return res.status(200).json(data)
        }
     } catch (error) {
        return res.status(400).json({error:"No user Found"})
     }
}

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

module.exports = { add_user,get_user,get_profile };
