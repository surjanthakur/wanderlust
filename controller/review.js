const Review = require("../models/review");
const Listing = require("../models/listings");

//create review route --->
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "new review added");
  res.redirect(`/listings/${listing._id}`);
};

//delete review route --->
module.exports.deleteRoute = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("err", "review deleted");
  res.redirect(`/listings/${id}`);
};
