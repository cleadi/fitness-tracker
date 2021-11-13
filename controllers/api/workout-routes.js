const router = require("express").Router();
const Workout = require("../models/workout.js");

// Get last workout information
router.get("/", (req, res) => {
  Workout.aggregate({ $addFields: { duration: { $sum: "exercise.duration" } } })
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Get <-- get workout duration of previous 7 workouts
router.get("/range", (req, res) => {
  Workout.aggregate({ $addFields: { duration: { $sum: "exercise.duration" } } })
    .limit(7)
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Post <-- add new workout
router.post("/", (req, res) => {
  Workout.create(req.body)
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Put <-- add new exercise
router.put("/:id", (req, res) => {
  Workout.update(
    { id: req.params.id },
    { $push: { exercise: req.body } },
    (err, db) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(db);
      }
    }
  );
});

module.exports = router;
