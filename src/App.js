import { useState } from "react";
import AddTask from "./components/AddTask"
import ToDo from "./components/ToDo";

function App() {
  const [taskList, setTaskList] =useState([])
  console.log(taskList)
  return (
<>
  <h1 className="text-2xl font-bold py-4 pl-6">Elona's Task Tracker</h1>
  <div className="flex flex-row items-center">
  <p className="text-xl pl-6">Click</p>
    <AddTask taskList={taskList} setTaskList={setTaskList}/>
  <p className="text-xl my-2">to add a new task</p>
  </div>
  <div>
  <h2 className="ml-6 text-xl  w-3/4 max-w-lg my-4 py-2 px-4 bg-gray-200">To Do:</h2>
  {taskList.map((task, i) => 
    
    <ToDo key={i} task={task} 
          index={i} taskList={taskList} 
          setTaskList={setTaskList}/>
    
  )}
  </div>
</>
  );
}

export default App;
