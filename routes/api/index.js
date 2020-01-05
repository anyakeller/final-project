const router = require("express").Router();
const contactRoutes = require("./contacts");
const userRoutes = require("./user");

//contacts
router.use("/contacts", contactRoutes);

// /api/user routes
router.use("/user", userRoutes);

module.exports = router;
