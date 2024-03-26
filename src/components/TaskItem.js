
import React, { useState } from 'react';

const TaskItem = ({ task, deleteTask, updateTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    updateTask(task.id, updatedTask); 
    setEditMode(false);
  };

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="task-item">
      {!editMode ? (
        <>
          <h3 className='title'>{task.title}</h3>
          <p className='title'>{task.description}</p>
          <p className='title'>Start Date: {task.startDate}</p>
          {task.endDate && <p>End Date: {task.endDate}</p>}
          <p className='title'>Status: {task.status}</p>
          <p className='title'>Assignee: {task.assignee}</p>
          <p className='title'>Priority: {task.priority}</p>
          <button className='edit-btn' onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <>
          <input type="text" name="priority" placeholder="Priority" value={updatedTask.priority} onChange={handleChange} />
          <select name="status" value={updatedTask.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deployed">Deployed</option>
            <option value="Deferred">Deferred</option>
          </select>
          <button onClick={handleSave}>Save</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
