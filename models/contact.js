const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  // while you may not know the persons name, one piece of identifying info is required which is quickref
  quickref: {type: String, required: true},
  name_first: String,
  name_last: String,
  meeting_info: {date: { type: Date, default: Date.now },where:String,whohow:String,details:String},
  mutualContacts:[String],
	occupation:String,
	notes:String
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
