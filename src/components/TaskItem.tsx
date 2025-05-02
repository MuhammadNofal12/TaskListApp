import React from "react";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
  return (
    <li
      className={`flex justify-between items-center py-2 border-b border-gray-300 ${
        task.isCompleted ? "line-through text-gray-400" : ""
      }`}
    >
      <span>{task.description}</span>
      <button
        onClick={() => onComplete(task.id)}
        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-400"
      >
        {task.isCompleted ? "Undo" : "Mark as Complete"}
      </button>
    </li>
  );
};

export default TaskItem;
