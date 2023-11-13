import React, { useState } from "react";
import { postTask } from "../helper/axiosHelper";

const initialState = {
  task: "",
  hr: "",
};

const thrsWk = 7 * 24;
export const Form = ({ setResp, setShowSpinner, fetchTasks, ttlHr }) => {
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // check if you have enought hours left to add this task

    if (ttlHr + +form.hr > thrsWk) {
      return alert("Not enough time to add this task");
    }

    setShowSpinner(true);

    // call api
    const data = await postTask(form);
    setResp(data);
    setShowSpinner(false);
    if (data.status === "success") {
      setForm(initialState);
      fetchTasks();
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="border p-5 rounded shadow-lg mt-4"
    >
      <div className="row g-2">
        <div className="col-md-6">
          <input
            name="task"
            type="text"
            className="form-control"
            placeholder="i.e. Coding"
            required
            onChange={handleOnChange}
            value={form.task}
          />
        </div>
        <div className="col-md-2">
          <input
            name="hr"
            type="number"
            className="form-control"
            placeholder="i.e. 44"
            required
            min={1}
            onChange={handleOnChange}
            value={form.hr}
          />
        </div>
        <div className="col-md-4 d-grid">
          <button className="btn btn-primary">Add New Task</button>
        </div>
      </div>
    </form>
  );
};
