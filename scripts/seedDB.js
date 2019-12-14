const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactreadinglist"
);

const contactSeed = [
  {
    name: "William Sloneker",
    when: new Date(Date.now()),
    where: "Upper East Side",
    how: "Event at The Pony Bar",
    what: "Utter nonsense",
    notes: "Bald. Might actually be named Derek or Alan. Unclear." 
  },
  {
    name: "Arnold Ramos",
    when: new Date(Date.now()),
    where: "Harlem",
    how: "Yoga Class",
    what: "Meditation, and how to hack coding class through self-acutalization",
    notes: "Favorite show may or may not be 'Hey Arnold!'" 
  },
  {
    name: "Veger Pena",
    when: new Date(Date.now()),
    where: "Washington Heights",
    how: "Coding Bootcamp",
    what: "Stocks, stonks, et. al.",
    notes: "" 
  },
  {
    name: "Anya Keller",
    when: new Date(Date.now()),
    where: "Park Slope",
    how: "Through the #random Slack channel",
    what: "Potato",
    notes: "More potato" 
  }
];

db.Contact
  .remove({})
  .then(() => db.Contact.collection.insertMany(contactSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
