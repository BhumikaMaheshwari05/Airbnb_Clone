const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")
const { savedUrl } = require("../middleware.js")
const usersController = require("../controllers/users.js")
const User = require('../models/user');


//signUp
router.route("/signup").
    get(usersController.renderSignUpForm)
    .post(wrapAsync(usersController.registerUser))



//login
router.route("/login")
    .get(usersController.renderLoginForm)
    .post(savedUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), usersController.login)

router.get("/logout", usersController.logout)



module.exports = router