import React, { useState, ChangeEvent } from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

type Filter = "all" | "completed" | "incomplete";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");
  //Handle adding a newTask
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj: Task = {
        id: Date.now(),
        description: newTask,
        isCompleted: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };
  const handleCompleteTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleEditTask = (taskId: number, newDesc: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, description: newDesc } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "incomplete") return !task.isCompleted;

    return true;
  });

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTask(e.target.value)
          }
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter a new task"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
        >
          Add Task
        </button>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-lg ${
            filter === "all" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-lg ${
            filter === "completed" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`px-3 py-1 rounded-lg ${
            filter === "incomplete" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Incomplete
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={handleCompleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
