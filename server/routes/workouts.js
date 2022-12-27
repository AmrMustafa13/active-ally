const express = require("express");

const {
  getWorkouts,
  createWorkout,
  getWorkoutByID,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workouts");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workouts routes
router.use(requireAuth);

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.get("/:id", getWorkoutByID);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
