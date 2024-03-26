import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask }) => {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    assignee: '',
    priority: '',
  });

  const [sortBy, setSortBy] = useState(null);

  const filteredTasks = tasks.filter(task => {
    const filterByDate = (!filters.fromDate || new Date(task.startDate) >= new Date(filters.fromDate)) &&
                        (!filters.toDate || new Date(task.startDate) <= new Date(filters.toDate));
    const filterByAssignee = !filters.assignee || task.assignee.toLowerCase().includes(filters.assignee.toLowerCase());
    const filterByPriority = !filters.priority || task.priority === filters.priority;

    return filterByDate && filterByAssignee && filterByPriority;
  });

  const sortedTasks = sortBy
    ? filteredTasks.slice().sort((a, b) => {
        if (sortBy === 'priority') {
          return a.priority.localeCompare(b.priority);
        } else if (sortBy === 'assignee') {
          return a.assignee.localeCompare(b.assignee);
        }
      })
    : filteredTasks;

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="task-board">
      <div className="filters">
        <h3>Filter By:</h3>
        <input className='filt-in' type="text" name="fromDate" placeholder="From Date" value={filters.fromDate} onChange={handleFilterChange} />
        <input className='filt-in' type="text" name="toDate" placeholder="To Date" value={filters.toDate} onChange={handleFilterChange} />
        <input className='filt-in' type="text" name="assignee" placeholder="Assignee" value={filters.assignee} onChange={handleFilterChange} />
        <select name="priority" value={filters.priority} onChange={handleFilterChange}>
          <option className='filters-priority' value="">Select Priority</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
      </div>
      <div className="sort">
        <label className='sort-label'>Sort By:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="priority">Priority</option>
          <option value="assignee">Assignee</option>
        </select>
      </div>
      <div className="task-columns">
        <div className="column">
          <h2 className='pending'>Pending</h2>
          {sortedTasks.filter(task => task.status === 'Pending').map(task => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </div>
        <div className="column">
          <h2 className='progress'>In Progress</h2>
          {sortedTasks.filter(task => task.status === 'In Progress').map(task => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </div>
        <div className="column">
          <h2 className='completed'>Completed</h2>
          {sortedTasks.filter(task => task.status === 'Completed').map(task => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask}  />
          ))}
        </div>
        <div className="column">
          <h2 className='deployed'>Deployed</h2>
          {sortedTasks.filter(task => task.status === 'Deployed').map(task => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask}  />
          ))}
        </div>
        <div className="column">
          <h2 className='deferred'>Deferred</h2>
          {sortedTasks.filter(task => task.status === 'Deferred').map(task => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
