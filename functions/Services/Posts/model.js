const { admin, db } = require("../../utils/admin");
const PostsUtils = require("./utils");
class Posts {
  constructor(user) {
    this.actionPerformer = user;
  }

  async getAllPosts() {
    let postsData = [];
    return db
      .collection("POSTS")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          postsData.push({
            postId: doc.id,
            post: doc.data().body,
            createdAt: doc.data().createdAt,
            likesCount: doc.data().likesCount,
            userImage: doc.data().userImage,
          });
        });
        return postsData;
      })
      .catch((err) => {
        throw err;
      });
  }

  async createPost(inputs) {
    console.log(this.actionPerformer)
    const postsData = {
      post: inputs.body,
      createdAt: new Date().toISOString(),
      email: this.actionPerformer.email,
      userImage: this.actionPerformer.imageUrl,
      likesCount: 0,
      commentsCount: 0,
    };
   return db.collection("POSTS")
      .add(postsData)
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Posts;
