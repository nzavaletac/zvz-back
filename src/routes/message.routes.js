const {
  createMessage,
  getMessages,
} = require("../controllers/message.controllers");

const router = require("express").Router();

router.route("").post(createMessage).get(getMessages);

module.exports = router;
