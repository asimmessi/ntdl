import TaskSchema from "./TaskSchema.js";

// add tasj to db
export const addTask = (obj) => {
  return TaskSchema(obj).save();
};

//get all the tasks

export const getTasks = () => {
  return TaskSchema.find();
};

export const updateTask = (_id, type) => {
  return TaskSchema.findByIdAndUpdate(_id, { type });
};

// @ids is an array
export const deleteTasks = (ids) => {
  return TaskSchema.deleteMany({
    _id: {
      $in: ids,
    },
  });
};
