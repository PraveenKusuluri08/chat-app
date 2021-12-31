const { admin, db } = require("../../utils/admin");

class PostsUtils {
  static async _isPostExists(postId) {
    return db
      .collection("POSTS")
      .doc(postId)
      .get()
      .then((snap) => {
          console.log(snap.docs)
        if (snap.size < 1) throw new Error("Post not exists");
        else {
          return snap.docs
        }
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = PostsUtils;
