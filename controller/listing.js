const Listing = require("../models/listings");

//all listings
module.exports.indexRoute = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//new route
module.exports.newListing = (req, res) => {
  res.render("listings/new.ejs");
};

//show route
module.exports.showRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  res.render("listings/show.ejs", { listing });
};

//create route
module.exports.createRoute = async (req, res) => {
  let url = req.file.path;
  let filename = req.flie;
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.flename = await newListing.save();
  req.flash("success", "new listing created");
  res.redirect("/listings");
};

//update route
module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.flie;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "listing updated successfully");
  res.redirect(`/listings/${id}`);
};

//edit route
module.exports.editRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
};

//delete route
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("err", "listing deleted");
  res.redirect("/listings");
};
