const router = require("express").Router();
const { Workout } = require("../models");

// create the workouts with the post route
router.post("/workouts", (req, res) => {
    Workout.create({ day: Date.now() }, function (error, success) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(success);
        }
    });
});

// Updates workouts as we go 
router.put("/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        function (error, success) {
            if (error) {
                res.status(400).json(error);
            } else {
                res.json(success);
            }
        }
    );
});

// route to get workouts that are recent
router.get("/workouts", (req, res) => {
    Workout.findOne({})
        .sort({ day: -1 })
        .then((dbTransaction) => {
            const work = new Workout(dbTransaction);
            work.totalDuration = work.getTotalDuration();
            res.json(work);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Get stats for last weeks workouts
router.get("/workouts/range", (req, res) => {
    Workout.find({})
        .sort({ day: -1 })
        .limit(7)
        .then((dbTransaction) => {
            const returnArray = [];
            dbTransaction.forEach((element) => {
                const work = new Workout(element);
                work.totalDuration = work.getTotalDuration();
                returnArray.push(work);
            });
            res.json(returnArray);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


module.exports = router;