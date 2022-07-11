const Message = require("../models/message.models");

exports.createMessage = async (req, res) => {
  const { body } = req;
  try {
    const message = await Message.create(body);
    res.status(201).json({ message: "Message is created.", message });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    Message.find()
      .sort({ createdAt: "desc" })
      .then((Messages) => {
        res.status(200).json({ messages: Messages });
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
