var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://golangfirebase-57bb9-default-rtdb.firebaseio.com",
  storageBucket:"fir-realworld-d5b34.appspot.com"
});


const db = admin.firestore()

const storage= admin.storage()

module.exports={db,admin,storage}