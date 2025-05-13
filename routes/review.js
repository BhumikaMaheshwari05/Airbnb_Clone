const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js')
const { validateReview } = require("../middleware.js")
const { isLoggedIn } = require("../middleware.js")
const { isReviewAuthor } = require("../middleware.js")
const reviewsController = require("../controllers/reviews.js")


//Reviews Post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsController.addReviews))

//Reviews Delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.deleteReviews))

module.exports = router