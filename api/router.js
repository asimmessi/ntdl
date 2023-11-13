import express from "express";
import {
  addTask,
  deleteTasks,
  getTasks,
  updateTask,
} from "./src/models/taskModels/TaskModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const taskLists = await getTasks();
  res.json({
    status: "success",
    message: "Here are the task list",
    taskLists,
  });
});

router.post("/", async (req, res) => {
  console.log(req.body);

  //add data to the database

  const result = await addTask(req.body);

  result?._id
    ? res.json({
        status: "success",
        message: "The task has been added",
      })
    : res.json({
        status: "error",
        message: "Unable to add the task, try again later",
      });
});

router.patch("/", async (req, res) => {
  console.log(req.body);

  const { _id, type } = req.body;
  //add data to the database

  const result = await updateTask(_id, type);

  result?._id
    ? res.json({
        status: "success",
        message: "The task has been switched successfully",
      })
    : res.json({
        status: "error",
        message: "Unable to update the task, try again later",
      });
});

router.delete("/", async (req, res) => {
  const ids = req.body;

  //add data to the database

  const result = await deleteTasks(ids);

  result.deletedCount
    ? res.json({
        status: "success",
        message: "The task has been deleted successfully",
      })
    : res.json({
        status: "error",
        message: "Unable to delete the tasks, try again later",
      });
});

export default router;
