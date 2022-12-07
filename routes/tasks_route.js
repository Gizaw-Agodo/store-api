const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");

router
  .route("/")
  //get all tasks
  .get(async (req, res) => {
    try {
      tasks = await Task.find({ completed: true });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json(error);
    }
  })

   // create specific task 
  .post(async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json({ task });
    } catch (error) {
      res.status(500).json({ error: error.errors.name.message });
    }
  });

router
  .route("/:id")

   // get specific task
  .get(async (req, res) => {
    try {
      const task = await Task.findOne({ _id: req.params.id });
      if (!task) {
        return res
          .status(404)
          .json({ msg: `no task with id ${req.params.id}` });
      }
      res.status(200).json({ task });
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  // update specific task
  .patch(async (req, res) => {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {new: true, runValidators: true }
      );
      if (!task) {
        return res.status(404).json({ msg: "task not found" });
      }
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ error });
    }
  })

  // delete specific task 
  .delete(async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id });
      if (!task) {
        return res
          .status(404)
          .json({ msg: `no task with id ${req.params.id}` });
      }
      res.status(200).json({ task });
    } catch (error) {
      res.status(404).json({ error });
    }
  });

module.exports = router;
