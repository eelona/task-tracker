import React, { useEffect, useState } from "react";

const EditTask = ({ task, index, taskList, setTaskList }) => {

  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setProjectName(task.projectName)
    setTaskDescription(task.taskDescription)
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task)
    taskList.splice(taskIndex, 1);
    const updatedTasks = [...taskList];
    updatedTasks[index] = { projectName, taskDescription };

    setTaskList(updatedTasks);

    setEditModal(false);
   
  };

  return (
    <>
      <button 
        className="bg-gray-400 text-white text-sm-uppercase font-semibold py-1.5 px-3 rounded-lg"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>

      {editModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-md bg-white border rounded-lg shadow-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Task</h3>
              <button
                className="text-gray-500 text-2xl leading-none"
                onClick={() => setEditModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdate}>
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

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white font-semibold uppercase text-sm px-4 py-2 rounded hover:opacity-80"
                  type="submit"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditTask;
