import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const ToDo = ({ task, index, taskList, setTaskList, onComplete }) => {
  const [time, setTime] = useState(task.duration); // Keeps track of time in ms
  const [running, setRunning] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: time, // Pass the current time (duration) to the dropped component
    },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        setRunning(false); // Stop the timer when dropped
        if (onComplete) {
          onComplete(index, time); // Pass the final time to the parent component
        }
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Timer logic
  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 100); // Update every 100ms
      }, 100);
    }
    return () => clearInterval(timer);
  }, [running]);

  // Delete task
  const handleDelete = () => {
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  };

  // Start or stop the timer
  const handleStartStop = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  // Reset the timer
  const handleReset = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <div
      className={`flex flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg ${
        isDragging ? "opacity-50" : ""
      }`}
      ref={drag}
    >
      <div className="w-full flex flex-row items-center justify-center sm:justify-evenly">
        <p className="font-semibold text-xl">{task.projectName}</p>
        <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
      </div>

      <p className="text-lg py-2">{task.taskDescription}</p>

      <div className="w-full flex flex-col sm:flex-row items-center justify-center">
        <div className="sm:w-1/4 text-xl font-semibold py-4">
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
