import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const array = localStorage.getItem("taskList");
    if (array) {
      const tasks = JSON.parse(array);
      setTaskList(tasks);
      setCompleted(tasks.filter((task) => task.completed));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(
        item.id,
        item.projectName,
        item.taskDescription,
        item.timestamp,
        item.duration
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (
    id,
    projectName,
    taskDescription,
    timestamp,
    duration
  ) => {
    const moveTask = taskList.filter((task) => id === task.id);
    setCompleted((completed) => [
      ...completed,
      { moveTask, projectName, taskDescription, timestamp, duration },
    ]);
  };

  return (
    <>
      <h1 className="text-2xl font-bold py-4 pl-6">Elona's Task Tracker</h1>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add a new task</p>
      </div>
      <div className="flex flex-row justify-between mx-6 mt-4 space-x-8">
        {/* To Do Section */}
        <div className="w-1/2">
          <h2 className="text-xl bg-gray-200 p-2 mb-4">To Do:</h2>
          <div className="space-y-4">
            {taskList.map((task, i) => (
              <div
                key={i}
                className="border rounded p-4 bg-white shadow-md space-y-2"
              >
                <ToDo
                  task={task}
                  index={i}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Completed Section */}
        <div className="w-1/2" ref={drop}>
          <h2 className="text-xl bg-gray-200 p-2 mb-4">Completed:</h2>
          <div className="space-y-4">
            {completed.map((task, i) => (
              <div
                key={i}
                className="border rounded p-4 bg-white shadow-md space-y-2"
              >
                <ToDo
                  task={task}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
