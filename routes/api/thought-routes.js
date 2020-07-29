const router = require("express").Router();

router.route("/").get().post();

router.route("/:id").get().put().delete();

router.route("/:id/reactions").post();

router.route("/:id/reactions/:reactionId").delete();

module.exports = router;
