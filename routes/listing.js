const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js')
const { isLoggedIn } = require("../middleware.js")
const { isOwner } = require("../middleware.js")
const { validateListing } = require("../middleware.js")
const propertyController = require("../controllers/property.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage}) //store in the cloudinary i.e cloudConfig.js

//Using Router.route

//New Route
router.get("/new", isLoggedIn, propertyController.renderNewForm)

// Index Route + //new route or create route
router.route("/")
.get( wrapAsync(propertyController.index))
.post( isLoggedIn, 
upload.single('image'), 
validateListing,
wrapAsync(propertyController.addProperty))


//Edit Route Form Rendering
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(propertyController.renderEditForm))

//Show Route + //Edit ROUTE +//Delete Route
router.route("/:id")
.get( wrapAsync(propertyController.showProperty))
.patch( isLoggedIn, isOwner,upload.single('image'), validateListing, wrapAsync(propertyController.updateProperty))
.delete(isLoggedIn, isOwner, wrapAsync(propertyController.deleteProperty));

module.exports = router

