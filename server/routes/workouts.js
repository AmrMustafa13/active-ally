const express = require("express");
const {
  getWorkouts,
  createWorkout,
  getWorkoutByID,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workouts");

const router = express.Router();

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.get("/:id", getWorkoutByID);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
