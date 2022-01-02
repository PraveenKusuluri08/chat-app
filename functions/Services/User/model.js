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
      

    };
    console.log(this.actionPerformer);
    let userDetails = reduceUserDetails(inputData);
    return AuthUtils._userExists(userId)
      .then(() => {
        db.collection("USERS").doc(userId).update(userDetails);
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = User;
