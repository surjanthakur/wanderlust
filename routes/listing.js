const express = require("express");
const router = express.Router();
const ExpressError = require("../errors/expressError");
const wrapAsync = require("../errors/wrapAsync");
const { listingSchema } = require("../joivalidation");
const { isLoggedIn, isOwner } = require("../middleware");
const listingController = require("../controller/listing");
const Listing = require("../models/listings");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

//valide schema middleware ---->
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

router
  .route("/")
  // Index route
  .get(wrapAsync(listingController.indexRoute))

  //new listing post route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createRoute)
  );

// new listings route
router.get("/new", isLoggedIn, listingController.newListing);

//show route
router.get("/:id", listingController.showRoute);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.editRoute);

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateRoute)
);

//delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteRoute)
);

//filter option
router.get("/filter/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const listingCategory = await Listing.find({ category: category });
    res.json(listingCategory);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;