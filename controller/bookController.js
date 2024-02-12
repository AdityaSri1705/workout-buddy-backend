const mongoose = require("mongoose");
const Workout = require("../model/bookModel");

// GET All workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAT: -1 });

  res.status(200).json(workouts);
};

// GET single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(404).json({ error: "No Such Workouts" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.json(404).json({ error: "No Such Workouts" });
  }

  res.status(200).json(workout);
};

// CREATE a workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  //   add to database

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(400).json({ error: "No Such Workouts" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  res.status(200).json(workout);
};

// UPDATE a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(400).json({ error: "No Such Workouts" });
  }

  const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
