import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Message, Spinner } from "./components/Message";
import { Tables } from "./components/Tables";
import { getTasks } from "./helper/axiosHelper";

function App() {
  const [resp, setResp] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();

    if (data.status === "success") {
      setTaskList(data.taskLists);
    }
  };

  const ttlHr = taskList.reduce((a, i) => a + +i.hr, 0);
  const msg = {
    message: `Total hours allocated =  ${ttlHr}hrs`,
  };
  return (
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col mt-4 text-center mb-4">
            <h1>Not to do list</h1>
          </div>
        </div>

        {resp.message && <Message resp={resp} />}
        {showSpinner && <Spinner />}
        {/* form here  */}
        <Form
          setResp={setResp}
          setShowSpinner={setShowSpinner}
          fetchTasks={fetchTasks}
          ttlHr={ttlHr}
        />

        <hr />
        {/* table here */}
        <Tables taskList={taskList} setResp={setResp} fetchTasks={fetchTasks} />

        {ttlHr > 0 && <Message resp={msg} />}
      </div>
    </div>
  );
}

export default App;
