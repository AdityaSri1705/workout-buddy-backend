const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controller/bookController");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);
// GET All workouts

router.get("/", getWorkouts);

// GET single workout
router.get("/:id", getWorkout);

// CREATE a workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
