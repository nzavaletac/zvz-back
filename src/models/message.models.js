const { Schema, model } = require("mongoose");
const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const messageSchema = new Schema(
  {
    nameLastName: {
      type: String,
      required: [true, "Name and last name is required."],
      minlength: 5,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      minlength: 5,
      match: emailRegexp,
    },
    company: {
      type: String,
      required: [true, "Company is required."],
      minlength: 5,
    },
    ruc: {
      type: String,
      required: [true, "Ruc is required."],
      minlength: 11,
      maxlength: 11,
    },
    phone: {
      type: String,
      required: [true, "Phone is required."],
      minlength: 9,
      maxlength: 9,
    },
    mensaje: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
