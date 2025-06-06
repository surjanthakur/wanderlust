const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listings");
require("dotenv").config();

main()
  .then(() => {
    console.log("db is working");
  })
  .catch((err) => console.log(err));

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

const initDb = async () => {
  await Listing.deleteMany({});

  let category = ["resorts", "mountains", "beaches", "camping"];

  let newdata = initData.data.map((obj) => ({
    ...obj,
    owner: "680c5e7083ae11ac9db6d741",
    category: category[Math.floor(Math.random() * category.length)],
  }));
  await Listing.insertMany(newdata);
  console.log("data was saved");
};

initDb();
