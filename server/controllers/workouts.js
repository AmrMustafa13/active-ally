const workoutsSchema = require("../models/workouts");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  try {
    const allWorkouts = await workoutsSchema.find().sort({ createdAt: -1 });
    res.status(200).json(allWorkouts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0)
    return res.status(400).json({
      error: "Please fill in all fields",
      emptyFields,
    });

  try {
    const newWorkout = new workoutsSchema({
      title,
      reps,
      load,
    });
    await newWorkout.save();
    res.status(201).send(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout by id
const getWorkoutByID = async (req, res) => {
  const { id } = req.params;

  // check if valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Workout not found!!" });

  const retrievedWorkout = await workoutsSchema.findById(id);

  // check if id is not found
  if (!retrievedWorkout)
    return res.status(404).json({ error: "Workout not found!!" });

  res.status(200).json(retrievedWorkout);
};

// delete a single workout by id
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // check if valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Workout not found!!" });

  const deletedWorkout = await workoutsSchema.findOneAndDelete({ _id: id });

  if (!deleteWorkout)
    return res.status(400).json({ error: "Workout not found!!" });

  res.status(204).json(deleteWorkout);
};

// update a single wourkout by id
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // check if valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Workout not found!!" });

  const updatedWorkout = await workoutsSchema.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!updatedWorkout)
    return res.status(400).json({ error: "Workout not found!!" });

  res.status(200).json(updatedWorkout);
};

module.exports = {
  getWorkouts,
  createWorkout,
  getWorkoutByID,
  deleteWorkout,
  updateWorkout,
};
