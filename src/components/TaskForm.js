import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: '',
    status: 'Pending', 
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.assignee.trim() && formData.priority.trim()) {
      const newTask = {
        id: Date.now(),
        startDate: new Date().toLocaleDateString(),
        ...formData,
      };
      addTask(newTask);
      setFormData({ title: '', description: '', assignee: '', priority: '', status: 'Pending' }); 
      setShowForm(false); 
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="task-form">
      <div className='new'>
      <h1 className='main-heading'>Task Board</h1>
      <button className='add-btn' onClick={toggleForm}>Add New Task</button>
      </div>
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleForm}>&times;</span>
            <form onSubmit={handleSubmit}>
              <input className='add-in' type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
              <textarea className='add-in' name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
              <input className='add-in' type="text" name="assignee" placeholder="Assignee" value={formData.assignee} onChange={handleChange} />
              <select className='add-in' name="priority" value={formData.priority} onChange={handleChange}>
                <option value="">Select Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
              <select className='add-in' name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deferred">Deferred</option>
              </select>
              <button className='submit-btn' type="submit">Add Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
