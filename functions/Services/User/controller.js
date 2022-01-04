const router = require("express").Router();
const { endPoint } = require("../../endpoint");
const User = require("./model");
router.put("/updateuser", endPoint, (req, res) => {
  //maintain last update details by that we can monitor the user login status
  const inputsData = req.body;
  const obj = new User(req.user);
  return obj
    .updateUserProfile(inputsData, req.user.uid)
    .then(() => {
      return res
        .status(200)
        .json({ message: "User Profile updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: err });
    });
});

router.get("/getauthdata", endPoint, (req, res) => {
  const obj = new User(req.user);
  obj
    .getAuthUserData()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: err });
    });
});
module.exports = router;
