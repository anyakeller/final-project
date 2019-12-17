const db = require('../models');

// Defining methods for the contactsController
module.exports = {
  findAll: function(req, res) {
    db.User.findOne({_id: req.session.userId})
      .populate('contacts')
      .sort({date: -1})
      .then(dbModel => {
        res.json(dbModel.contacts);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Contact.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.session.userId);
    // console.log(`req.header.session ${JSON.stringify(req.session, null, 4)}`);
    db.Contact.create(req.body)
      .then(dbContact => {
        db.User.findOneAndUpdate(
          {_id: req.session.userId},
          {$push: {contacts: dbContact._id}},
          {new: true}
        ).then(function(dbUser) {
          // If the User was updated successfully, send it back to the client
					console.log(dbUser);
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
