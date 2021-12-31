const router = require("express").Router();
const { endPoint, getIdToken } = require("../../endpoint");
const { checkCreatePost } = require("../../helpers/utils");
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

router.get("/getsingleposts", endPoint, (req, res) => {
  const obj = new Posts(req.user);
  const { id } = req.query;
  obj
    .getSinglePost(id)
    .then(() => {
      return res.status(200).json({});
    })
    .catch((err) => {
      return res.status(500).json({ err: err });
    });
});

router.post("/createpost", getIdToken, (req, res) => {
  const obj = new Posts(req.user);
  const err = checkCreatePost()
  if(err.body.length){
    return res.status(404).json({message:err})
  }
  obj
    .createPost(req.body)
    .then(() => {
      return res.status(202).json({ message: "Post created successfully" });
    })
    .catch((err) => {
      return res.status(404).json({ message: "failed to create post" });
    });
});

module.exports = router;
