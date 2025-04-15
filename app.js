const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const listing = require("./models/listing");
const path = require('path');
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});


// Index Route
app.get("/listings",async (req,res)=>{
   const allListings = await listing.find({});
   res.render("listings/index",{allListings});
});

// Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/show",{Listing});
})
app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
