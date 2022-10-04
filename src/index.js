const express = require("express");
const app = require("./app.js");
const mongoose = require("mongoose");
const port = 3000;
const Subscriber = require("./models/subscribers");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
const DATABASE_URL = "mongodb://localhost:27017/subscribers";
// mongoose.connect(DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", () => console.log("connected to database"));

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to Database`);
  })
  .catch((err) => {
    console.log(`Connection Error`);
    console.log(err);
  });

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
