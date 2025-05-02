import React, { useState } from "react";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
  onEdit: (taskId: number, newDesc: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.description);

  const handleEditSave = () => {
    if (editedText.trim()) {
      onEdit(task.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`flex justify-between items-center py-2 border-b border-gray-300 ${
        task.isCompleted ? "line-through text-gray-400" : ""
      }`}
    >
      {isEditing ? (
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="flex-1 border p-1 mr-2"
        />
      ) : (
        <span className="flex-1">{task.description}</span>
      )}
      {isEditing ? (
        <button
          onClick={handleEditSave}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-400 mr-2"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 mr-2"
        >
          Edit
        </button>
      )}
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
