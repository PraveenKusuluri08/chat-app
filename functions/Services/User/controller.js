const router = require("express").Router();
const endpoint = require("../../endpoint");
const User = require("./model")
router.put("/updateuser", endpoint, (req, res) => {
  //maintain last update details by that we can monitor the user login status
  const inputsData = req.body
  const obj = new User(req.user);
  return obj
    .updateUserProfile(inputsData,req.user.uid)
    .then(() => {
      return res
        .status(200)
        .json({ message: "User Profile updated successfully" });
    })
    .catch((err) => {
      console.log(err)
      return res.status(404).json({ message: err });
    });
});
module.exports = router;
