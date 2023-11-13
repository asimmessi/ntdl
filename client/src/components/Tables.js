import React, { useState } from "react";
import { deleteTasks, switchTask } from "../helper/axiosHelper";
import { Message } from "./Message";

export const Tables = ({ taskList, setResp, fetchTasks }) => {
  const [idsToDelete, setIdsToDlete] = useState([]);

  const entryArg = taskList.filter((itm) => itm.type === "entry");
  const badArg = taskList.filter((itm) => itm.type === "bad");

  const handleOnSwitch = async (_id, type) => {
    const data = await switchTask({ _id, type });

    setResp(data);

    data.status === "success" && fetchTasks();
  };

  const handleOnSelectAll = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);

    const filteredArg = [];
    taskList.forEach((item) => {
      if (item.type === value) {
        filteredArg.push(item._id);
      }
    });

    if (checked) {
      // add ids to delete
      setIdsToDlete([...idsToDelete, ...filteredArg]);
    } else {
      //remove these ids
      const afterRemovingIdsArg = idsToDelete.filter(
        (id) => !filteredArg.includes(id)
      );

      setIdsToDlete(afterRemovingIdsArg);
    }
  };

  const handleOnItemSelect = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked) {
      // add to delte
      setIdsToDlete([...idsToDelete, value]);
    } else {
      //remove id

      setIdsToDlete(idsToDelete.filter((item) => item !== value));
    }
  };

  const handleOnDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete all the selected tasks")
    ) {
      const result = await deleteTasks(idsToDelete);
      setResp(result);

      if (result?.status === "success") {
        fetchTasks();
        setIdsToDlete([]);
      }
    }
  };

  const ttlHr = badArg.reduce((a, i) => a + +i.hr, 0);
  const msg = {
    status: "success",
    message: `You could have saved ${ttlHr}hrs`,
  };
  return (
    <>
      <div className="row mt-5">
        <div className="col-md ">
          <h3 className="text-center">Entry list</h3>
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="allEntry"
              value="entry"
              onChange={handleOnSelectAll}
            />{" "}
            <label htmlFor="allEntry">Select All Entry</label>
          </div>
          <table class="table  table-striped table-hover border">
            <tbody>
              {entryArg.map(({ _id, task, hr }) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={_id}
                      value={_id}
                      checked={idsToDelete.includes(_id)}
                      onChange={handleOnItemSelect}
                    />{" "}
                    <label htmlFor={_id}>{task}</label>
                  </td>

                  <td>{hr}hr</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleOnSwitch(_id, "bad")}
                      className="btn btn-success"
                    >
                      <i class="fa-solid fa-arrow-right fa-shake"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md ">
          <h3 className="text-center">Bad list</h3>
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="allBad"
              value="bad"
              onChange={handleOnSelectAll}
            />{" "}
            <label htmlFor="allBad">Select All Bad</label>
          </div>
          <table class="table  table-striped table-hover border">
            <tbody>
              {badArg.map(({ _id, task, hr }) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={_id}
                      value={_id}
                      checked={idsToDelete.includes(_id)}
                      onChange={handleOnItemSelect}
                    />{" "}
                    <label htmlFor={_id}>{task}</label>
                  </td>

                  <td>{hr}hr</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleOnSwitch(_id, "entry")}
                      className="btn btn-danger"
                    >
                      <i class="fa-solid fa-arrow-left fa-shake"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {ttlHr > 0 && <Message resp={msg} />}
        </div>
      </div>
      {idsToDelete.length > 0 && (
        <div className="d-grid">
          <button className="btn btn-danger btn-lg" onClick={handleOnDelete}>
            Delete {idsToDelete.length} tasks
          </button>
        </div>
      )}
    </>
  );
};
