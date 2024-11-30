var express = require("express");
var router = express.Router();
const { Contact, contactSchema } = require("../models/contact");
const validate = require("../middlewares/validate");

router.get("/", async function (req, res, next) {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.post("/add", async function (req, res, next) {
  const cont = new Contact({ fullName: "test", phoneNumber: "123" });
  const newContact = await cont.save();
  res.json(newContact);
});

router.post("/", validate(contactSchema), async function (req, res, next) {
  //const {fullName, phoneNumber} = req.body
  const cont = new Contact({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
  });
  const newContact = await cont.save();
  res.json(newContact);
});

router.delete("/:id", async function (req, res, next) {
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.json(deletedContact);
});

router.put("/:id", validate(contactSchema), async function (req, res, next) {
  const { id } = req.params;
  const oldContact = await Contact.findByIdAndUpdate(id, {
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
  });
  res.send(oldContact.fullName + "has been updated !");
});

module.exports = router;
