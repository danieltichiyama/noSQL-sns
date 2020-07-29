const { Schema, model } = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is required.",
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: "Email address is required",
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    thoughts: [],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.reduce((total, comment) => {
    return total + comment.replies.length + 1;
  }, 0);
});

const User = model("User", UserSchema);

module.exports = User;
