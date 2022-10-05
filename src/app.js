const express = require("express");
const app = express();
const subscriberModel = require("./models/subscribers");

// Get array of all subscribers from database
app.get("/subscribers", (req, res) => {
  const subscribers = req.params;
  subscriberModel
    .find(subscribers, { __v: 0 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get array of subscriber's name and subscribed channel from database
app.get("/subscribers/names", (req, res) => {
  const subscribers = req.params;
  subscriberModel
    .find(subscribers, { _id: 0, __v: 0, subscribedDate: 0 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get a particular subscriber from database using _id
app.get("/subscribers/:id", (req, res) => {
  const id = req.params.id;

  subscriberModel
    .findById({ _id: id }, { __v: 0 })
    .then((data) => {
      if (!data) {
        // When the subscriber is not found for the given id.
        error = Error(
          `Cast to ObjectId failed for value \"{ _id: '${id}' }\" (type Object) at path \"_id\" for model \"Subscriber\"`
        );
        res.status(400).json({ message: error.message });
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      // When the id is not present in the correct format.
      res.status(400).json({ message: error.message });
    });
});

module.exports = app;
