const express = require("express");
const router = express.Router();
const wrapAsync = require("../errors/wrapAsync");
const ExpressError = require("../errors/expressError");
const { reviewSchema } = require("../joivalidation");
const { isReviewOwner, isLoggedIn } = require("../middleware");
const { createReview, deleteRoute } = require("../controller/review");

//joi validation schema
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

//create  review route
router.post("/:id/review", isLoggedIn, validateReview, wrapAsync(createReview));

//delete route
router.delete(
  "/:id/review/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(deleteRoute)
);

module.exports = router;
