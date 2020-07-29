const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    validate: [
      (str) => {
        if (str.length >= 280) {
          return true;
        }
      },
      "Reactions must be under 280 characters.",
    ],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => {
      moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a");
    },
  },
});

const ThoughtSchema = new Schema(
  {
    thoughttext: {
      type: String,
      required: true,
      validate: [
        (str) => {
          if (str.length >= 1 && str.length <= 280) {
            return true;
          }
        },
        "Thoughts must be between 1 and 280 characters.",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => {
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a");
      },
    },
    username: { type: String, required: true },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
