const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {;
        cb(null, "Images/");
    },
    filename: (req, file, cb) => {
        const unique = Date.now();
        console.log("Original Filename:", file.originalname);
        console.log("Generated Filename:", unique + "-" + file.originalname);
        cb(null, unique + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;
