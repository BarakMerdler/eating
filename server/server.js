const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const apiPort = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB Connected!"))
  .catch(e => {
    console.log("Connection error ", e.error);
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to DB");
});

//!--- Schema for products ---!
const schema = new mongoose.Schema({
  day: {
    type: Number
  },
  month: {
    type: Number
  },
  year: {
    type: Number
  },
  hour: {
    type: Number
  },
  min: {
    type: Number
  },
  meal: "String",
  content: "String",
  lastUpNumber: {
    type: Number,
    default: Number.now
  }
});
const meals = mongoose.model("meals", schema);

//!--- middlewher ---!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  meals
    .find({})
    .then(meal => {
      res.send(meal);
    })
    .catch(e => console.log(e));
});

app.post("/", (req, res) => {
  const meal = new meals({
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    meal: req.body.meal,
    content: req.body.content
  });
  meal.save(err => {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

app.post("/delete", (req, res) => {
  meals
    .deleteMany({})
    .then(res.sendStatus(200))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
