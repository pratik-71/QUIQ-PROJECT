const admin = require("firebase-admin");

const serviceAccount = require("./Firebase_keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin