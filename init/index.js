const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listings");

main()
  .then(() => {
    console.log("db is working");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () => {
  await Listing.deleteMany({});

  let category = ["resorts", "mountains", "beaches", "camping"];

  let newdata = initData.data.map((obj) => ({
    ...obj,
    owner: "67d2c671bace8865f1aa6d9e",
    category: category[Math.floor(Math.random() * category.length)],
  }));
  await Listing.insertMany(newdata);
  console.log("data was saved");
};

initDb();
