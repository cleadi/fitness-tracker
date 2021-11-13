const router = require("express").Router();
const Workout = require("../../models/Workouts");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate({
    $addFields: { totalDuration: { $sum: "$exercises.duration" } },
  })
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate({
    $addFields: { totalDuration: { $sum: "$exercises.duration" } },
  })
    .limit(7)
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Post <-- add new workout
router.post("/api/workout/", (req, res) => {
  Workout.create(req.body)
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Put <-- add new exercise
router.put("/api/workouts/:id", (req, res) => {
  Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
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
