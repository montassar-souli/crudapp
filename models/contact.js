const mongoose = require("mongoose");
const yup = require("yup");

const contact = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
});

const contactSchema = yup.object({
  body: yup.object({
    fullName: yup.string().min(2).max(10).required(),
    phoneNumber: yup.string().required(),
  }),
});

const Contact = mongoose.model("Contacts", contact);

module.exports = { Contact, contactSchema };
