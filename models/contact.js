const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  //For the name of the person met
  name: { type: String, required: true },
  //Date of the first meeting, defaults to present day
  when: { type: Date, default: Date.now, required: true },
  //Location of the first meeting
  where: {type: String},
  //How did you meet (including who introduced you)
  how: {type: String},
  //What did you talk about?
  what: {type: String},
  //Additional details about the person
  notes: {type: String},
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
