const db = require('../models');

// Defining methods for the contactsController
module.exports = {
  findAll: function(req, res) {
    db.User.findOne({_id: req.session.userId})
      .populate('contacts')
      .then(dbModel => {
        var thing = dbModel.contacts.sort(function(a, b) {
          return a.name_last.localeCompare(b.name_last);
        });
        res.json(thing);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Contact.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  search: function(req, res) {
    console.log('hit search');
    db.User.findOne({_id: req.session.userId})
      .populate('contacts')
      .then(dbModel => {
				console.log(dbModel.contacts);
        var thing = dbModel.contacts.filter(function(contact) {
					var fullName = contact.name_last+contact.name_first;
					// console.log(fullName);
					// console.log(req.params.query);
          return fullName.toLowerCase().includes(req.params.query.toLowerCase());
        });
        res.json(thing);
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // console.log(req.session.userId);
    // console.log(`req.header.session ${JSON.stringify(req.session, null, 4)}`);
    db.Contact.create(req.body)
      .then(dbContact => {
        db.User.findOneAndUpdate(
          {_id: req.session.userId},
          {$push: {contacts: dbContact._id}},
          {new: true}
        ).then(function(dbUser) {
          // If the User was updated successfully, send it back to the client
          res.json(dbUser);
        });
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Contact.findOneAndUpdate({_id: req.params.id}, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Contact.findById({_id: req.params.id})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
