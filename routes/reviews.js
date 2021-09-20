const catchAsync = require("../utils/catchAsync");
const express = require('express');
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");
const router = express.Router({ mergeParams: true });
const reviews = require('../Controllers/reviews')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isReviewAuthor, isLoggedIn, catchAsync(reviews.deleteReview))

module.exports = router;