import React, { useState, ChangeEvent } from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}
const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  //Handle adding a newTask
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: Date.now(),
        description: newTask,
        isCompleted: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };
  const handleCompleteTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };
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
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onComplete={handleCompleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
