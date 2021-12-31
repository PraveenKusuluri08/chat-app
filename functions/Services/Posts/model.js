const { admin, db } = require("../../utils/admin");

class Posts {
  constructor(user) {
    this.actionPerformer = user;
  }

  async getAllPosts() {
    let postsData = [];
    db.collection("POSTS").onSnapshot((snap) => {
      snap.docs.forEach(
        (doc) => {
          postsData.push(doc.data())
        },
        (err) => {
          throw err;
        }
      );
      return postsData
    });
  }
}

module.exports = Posts;
