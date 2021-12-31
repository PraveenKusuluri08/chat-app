const router = require("express").Router();
const endPoint = require("../../endpoint");
const Posts = require("./model");
router.get("/getallposts", endPoint, (req, res) => {
  const obj = new Posts(req.user);
  try {
    obj.getAllPosts().then((data) => {
      console.log(data);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports= router