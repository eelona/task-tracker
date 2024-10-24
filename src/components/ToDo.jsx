import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";

const ToDo = ({ task, index, taskList, setTaskList }) => {
  const [time, setTime] = useState(0); 
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 100); 
      }, 100);
    }
    return () => clearInterval(timer); 
  }, [running]);

  const handleDelete = () => {
    setTaskList((currentTasks) => currentTasks.filter((todo) => todo.id !== task.id));
  };

  const handleStartStop = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <div className="flex flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg">
      <div className="w-full flex flex-row items-center justify-evenly">
        <p className="font-semibold text-xl">{task.projectName}</p>
        <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
      </div>

      <p className="text-lg py-2">{task.taskDescription}</p>
      <div className="w-full flex flex-col items-center justify-center">
      <div className="w-1/4 text-xl font-semibold py-4">
        <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span className="text-sm">{("0" + Math.floor((time % 1000) / 10)).slice(-2)}</span> 
      
      </div>
      <div className="flex flex-row justify-evenly gap-4">
        <button className="border rounded-lg py-1 px-3" onClick={handleStartStop}>
          {running ? "Stop" : "Start"}
        </button>
        <button className="border rounded-lg py-1 px-3" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="bg-red-500 text-sm uppercase font-semibold py-1.5 px-3 mt-6 mb-1 rounded-lg"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
    </div>
  );
};

export default ToDo;
