import { useState } from "react";

const AddTask = ({taskList, setTaskList}) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleInput= e => {
      const {name, value} = e.target;

      if(name === "projectName") setProjectName(value)
        if(name ==="taskDescription") setTaskDescription(value)
  }

  const handleAdd = e => {
    e.preventDefault();
    setTaskList(
      [...taskList, {projectName, taskDescription}] 
    )
    setAddModal(false);
    setProjectName("")
    setTaskDescription("")
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white uppercase text-sm 
      font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70"
        type="button"
        onClick={() => setAddModal(true)}
      >
        + New
      </button>

      {addModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-md bg-white border rounded-lg shadow-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Task</h3>
              <button
                className="text-gray-500 text-2xl leading-none"
                onClick={() => setAddModal(false)}
              >
                &times;
              </button>
            </div>

            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="project-name"
                >
                  Project Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  id="project-name"
                  name="projectName"
                  type="text"
                  placeholder="Project name"
                  value={projectName}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="task-description"
                >
                  Task Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  id="task-description"
                  name="taskDescription"
                  rows="5"
                  placeholder="Task description"
                  value={taskDescription}
                  onChange={handleInput}
                />
              </div>
            </form>

            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white font-semibold uppercase text-sm px-4 py-2 rounded hover:opacity-80"
                onClick={handleAdd}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddTask;
