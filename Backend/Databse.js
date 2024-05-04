const { default: mongoose } = require("mongoose");

const DATABASE_STRING = "mongodb+srv://pratikdabhade66344:7CEoWx2gMD8XSgdC@cluster0.f0mlezt.mongodb.net/Quiq-userinfo";


const connection = () => {
  mongoose
    .connect(DATABASE_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to database is successful"))
    .catch((error) => console.log(error));
};

module.exports = connection;