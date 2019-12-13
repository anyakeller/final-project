const router = require("express").Router();
const bookRoutes = require("./books");
const contactRoutes = require("./contacts");
const userRoutes = require("./user");

// /api/book routes
router.use("/books", bookRoutes);

//contacts
router.use("/contacts", contactRoutes);

// /api/user routes
router.use("/user", userRoutes);

module.exports = router;
