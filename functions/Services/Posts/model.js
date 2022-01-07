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
    console.log(this.actionPerformer);
    const postsData = {
      post: inputs.body,
      createdAt: new Date().toISOString(),
      email: this.actionPerformer.email,
      userImage: this.actionPerformer.imageUrl,
      likesCount: 0,
      commentsCount: 0,
    };
    return db
      .collection("POSTS")
      .add(postsData)
      .catch((err) => {
        throw err;
      });
  }
  async getPostWithComments(postId) {
    let postData = {};
    let commentDb = db.collection("COMMENT");
    return db.collection("POSTS")
      .doc(postId)
      .get()
      .then((data) => {
        postData = data.data();
        postData["postId"] = postId;

        let comments = commentDb.where("postId", "==", postId).get();
        return comments;
      })
      .then((data) => {
        postData["comments"]=[]
        data.forEach((doc) => {
          postData["comments"].push(doc.data())
        });
        return postData;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Posts;
