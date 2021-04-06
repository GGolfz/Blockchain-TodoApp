import React, { Fragment, useState, useEffect } from "react";
import web3 from "../etheruem/web3";
import todoList from "../etheruem/todolist";

const Index = () => {
  const [account, setAccount] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchAccount();
    setInterval(() => {
      fetchData();
    }, 500);
  }, []);
  const fetchAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const fetchData = async () => {
    const taskIds = await todoList.methods.getTaskIds().call();
    const task = await Promise.all(
      taskIds.map((id) => {
        return todoList.methods.getTask(id).call();
      })
    );
    const tranformTaskData = task.map((item) => {
      return {
        id: item[0],
        date: item[1],
        content: item[2],
        done: item[3],
      };
    });
    await modifyData(tranformTaskData);
  };
  const modifyData = async (data) => {
    let isDone = [];
    let notDone = [];
    for (let i of data) {
      if (i.done) {
        isDone.push(i);
      } else {
        notDone.push(i);
      }
    }
    isDone.sort((a, b) => a.id - b.id);
    notDone.sort((a, b) => a.id - b.id);
    setTasks([...notDone, ...isDone]);
  };

  const handleSubmit = async ({ key }) => {
    if (key != "Enter" || content == "") return;
    createTask();
  };
  const createTask = async () => {
    let temp = content;
    setContent("");
    await todoList.methods.createTask(temp).send({
      from: account,
      gas: "1000000",
    });
  };
  const toggleTaskStatus = async (id) => {
    await todoList.methods.toggleTaskStatus(id).send({
      from: account,
      gas: "1000000",
    });
  };
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          flexFlow: "column",
          alignItems: "center",
          background: "#FAFAFA",
        }}
      >
        <div style={{ fontSize: "2rem", paddingTop: "2rem" }}>To Do App</div>
        <div style={{ width: "50%", padding: "1.5rem 0" }}>
          <input
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "1.5rem",
              outline: "none",
              border: "1px solid #F0F0F0",
			  fontSize:'1.2rem'
            }}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleSubmit}
          />
        </div>
        <div>
          {tasks.map((item) => {
            return (
              <p
                style={{
                  textDecoration: item.done ? "line-through" : "",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.2rem",
                }}
                key={item.id}
              >
                <span style={{ marginRight: ".5rem" }}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleTaskStatus(item.id)}
                  />
                </span>
                {item.content}
              </p>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default Index;
