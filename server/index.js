const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const workoutsRoute = require("./routes/workouts");
const usersRoute = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api/workouts", workoutsRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5000;

const CONNECTION_STRING = `mongodb+srv://amrmostafa:${process.env.DATABASE_PASSWORD}@cluster0.vsv4oxd.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => console.log("App is up and running..."));
  })
  .catch((error) => console.log(error.message));
