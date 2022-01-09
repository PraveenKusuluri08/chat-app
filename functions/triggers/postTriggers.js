const { admin, db } = require("../utils/admin");

async function updateCommentsCount(snap, context) {
  const { id } = context.params;
  console.log(`Comment created with the id ${id}`);
  const { postId } = snap.data();
  const countComments = db.collection("POSTS").doc(postId);
  const FieldValue = admin.firestore.FieldValue;
  return countComments
    .set({
      commentsCount: FieldValue.increment(1),
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { updateCommentsCount };
