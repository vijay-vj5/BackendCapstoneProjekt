const express = require("express");
const app = express();
const subscriberModel = require("./models/subscribers");

app.use(express.json());

// Get array of all subscribers from database
app.get("/subscribers", async (req, res) => {
  const subscribers = await subscriberModel.find().select("-__v");
  res.json(subscribers);
});

// Get array of subscriber's name and subscribed channel from database
app.get("/subscribers/names", async (req, res) => {
  const subscribers = await subscriberModel
    .find()
    .select("-_id -subscribedDate -__v");
  res.json(subscribers);
});

// Get a particular subscriber from database using _id
app.get("/subscribers/:id", async (req, res) => {
  const id = req.params.id;

  await subscriberModel
    .findById(id, { __v: 0 })
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
      // When the id is not entered in the correct format.
      res.status(400).json({ message: error.message });
    });
});

// Add a subscriber to the database and shows the added subscriber to the client.
app.post("/subscribers/add", async (req, res) => {
  const subscribers = new subscriberModel({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel,
  });

  await subscribers
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

// Update a subscriber from the database using _id and shows the updated subscriber to the client.
app.put("/subscribers/update/:id", async (req, res) => {
  let upId = req.params.id;
  let upName = req.body.name;
  let upSubscribedChannel = req.body.subscribedChannel;

  await subscriberModel
    .findOneAndUpdate(
      { _id: upId },
      { $set: { name: upName, subscribedChannel: upSubscribedChannel } },
      { new: true }
    )
    .then((data) => {
      if (!data) {
        // When the subscriber is not present for the given id.
        error = Error(
          `Cast to ObjectId failed for value \"{ _id: '${upId}' }\" (type Object) at path \"_id\" for model \"Subscriber\"`
        );
        res.status(400).json({ message: error.message });
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      // When the id is not entered in the correct format.
      res.status(400).json({ message: error.message });
    });
});

// Delete a subscriber from the database using _id and shows the deleted subscriber to the client.
app.delete("/subscribers/delete/:id", async (req, res) => {
  const id = req.params.id;

  await subscriberModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      if (!data) {
        // When the subscriber is not present for the given id.
        error = Error(
          `Cast to ObjectId failed for value \"{ _id: '${id}' }\" (type Object) at path \"_id\" for model \"Subscriber\"`
        );
        res.status(400).json({ message: error.message });
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      // When the id is not entered in the correct format.
      res.status(400).json({ message: error.message });
    });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
module.exports = app;
