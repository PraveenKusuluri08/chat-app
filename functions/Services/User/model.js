const { data } = require("autoprefixer");
const { reduceUserDetails } = require("../../helpers/utils");
const { admin, db } = require("../../utils/admin");
const AuthUtils = require("../Authentication/utils");
class User {
  constructor(user) {
    this.actionPerformer = user;
  }

  async updateUserProfile(inputData, userId) {
    const updateData = {
      name: inputData.name,
      lastUpdate: new Date().toISOString(),
    };
    console.log(this.actionPerformer);
    let userDetails = reduceUserDetails(inputData);
    return AuthUtils._userExists(userId)
      .then(() => {
        db.collection("USERS").doc(userId).update(updateData);
      })
      .catch((err) => {
        throw err;
      });
  }
  /** 
  @getAuthUserData 
      this function is mainly useful for to get the loggedIn userData
      data which we need to recieve is personal userData, likes, posts
  */
  async getAuthUserData() {
    let user = {};
    return db
      .collection("USERS")
      .doc(this.actionPerformer.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          user["creds"] = doc.data();
          return db
            .collection("LIKES")
            .where("email", "==", this.actionPerformer.email)
            .get();
        }
      })
      .then((data) => {
        user["likes"] = [];
        data.forEach((like) => {
          user["likes"].push(like.data());
        });
        return db
          .collection("POSTS")
          .where("email", "==", this.actionPerformer.email)
          .get();
      })
      .then((postsData) => {
        user["posts"] = [];

        postsData.forEach((post) => {
          user["posts"].push(post.data());
        });
        return user;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = User;
