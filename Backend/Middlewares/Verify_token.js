const  admin = require("../Config/Firebase.config")


const Verify_token  = async(req,res,next)=>{

    if(!req.headers.authorization){
       return  res.status(404).json({messege:"Not Found"})
    }
    const token = req.headers.authorization.split(" ")[1]

    console.log(token)
    
    try {
        const decodetoken = await admin.auth().verifyIdToken(token)

        console.log(decodetoken)

        if(!decodetoken){
            return res.status(400).json({success:false,messege:"UnAuthorised user"})
        }
        req.user = decodetoken.uid
        next()
    } catch (error) {
       return res.status(400).json({success:false,messege:"User not found"})
    }

}

module.exports = {Verify_token}