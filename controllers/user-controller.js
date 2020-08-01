const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((results) => res.json(results))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .select("-__v")
      .then((results) => {
        if (!results) {
          res.status(400).json({ message: "No user found with this id." });
          return;
        }
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((results) => res.json(results))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((results) => {
        if (!results) {
          res.status(400).json({ message: "No user found with this id." });
          return;
        }
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((results) => {
        if (!results) {
          res.status(400).json({ message: "No user found with this id." });
          return;
        }
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // friends
  addFriend(req, res) {
    User.findOne({ _id: req.params.friendId }).then((results) => {
      if (!results) {
        res.status(400).json({ message: "Friend id not found." });
        return;
      } else {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { friends: req.params.friendId } },
          { new: true }
        )
          .then((results) => {
            if (!results) {
              res.status(400).json({ message: "No user found with this id." });
              return;
            }
            res.json(results);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      }
    });
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((results) => {
        if (!results) {
          res.status(400).json({ message: "No user found with this id." });
          return;
        }
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
