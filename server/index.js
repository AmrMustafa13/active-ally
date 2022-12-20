const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const workoutsRoute = require("./routes/workouts");

const app = express();

app.use(express.json());

app.use("/api/workouts", workoutsRoute);

const PORT = process.env.PORT || 5000;

const CONNECTION_STRING = `mongodb+srv://amrmostafa:${process.env.DATABASE_PASSWORD}@cluster0.vsv4oxd.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => console.log("App is up and running..."));
  })
  .catch((error) => console.log(error.message));
