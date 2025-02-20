import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ tasks, deleteTask, toggleComplete, editTask }) => {
  const [sortOption, setSortOption] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState({});

  const sortTasks = (tasksArray) => {
    let sorted = [...tasksArray];
    if (sortOption === 'date') {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOption === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    return sorted;
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const now = new Date();
  const upcomingTasks = filteredTasks.filter(task => !task.completed && new Date(task.dueDate) >= now);
  const overdueTasks = filteredTasks.filter(task => !task.completed && new Date(task.dueDate) < now);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const toggleExpand = (id) => {
    if (expandedTasks.includes(id)) {
      setExpandedTasks(expandedTasks.filter((tid) => tid !== id));
      setEditingTask(null);
    } else {
      setExpandedTasks([...expandedTasks, id]);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedTaskData({ ...task });
  };

  const handleEditChange = (e) => {
    setEditedTaskData({ ...editedTaskData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    editTask(editedTaskData);
    setEditingTask(null);
  };

  const renderSection = (sectionTitle, tasksArray) => {
    const sorted = sortTasks(tasksArray);
    return (
      <div className="dashboard-section">
        <h2>{sectionTitle}</h2>
        {sorted.length === 0 ? (
          <p>No {sectionTitle.toLowerCase()}.</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((task) => (
                <React.Fragment key={task.id}>
                  <tr
                    className={`task-row ${expandedTasks.includes(task.id) ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(task.id)}
                  >
                    <td>{task.title}</td>
                    <td>{task.dueDate}</td>
                    <td>
                      <span className={`priority-label ${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>
                  </tr>

                  {expandedTasks.includes(task.id) && (
                    <tr className="description-row">
                      <td colSpan="3">
                        <div className="task-details">
                          {editingTask === task.id ? (
                            <div className="edit-task-form">
                              <input
                                type="text"
                                name="title"
                                value={editedTaskData.title}
                                onChange={handleEditChange}
                                placeholder="Task Title"
                              />
                              <textarea
                                name="description"
                                value={editedTaskData.description}
                                onChange={handleEditChange}
                                placeholder="Task Description"
                              />
                              <input
                                type="date"
                                name="dueDate"
                                value={editedTaskData.dueDate}
                                onChange={handleEditChange}
                              />
                              <select name="priority" value={editedTaskData.priority} onChange={handleEditChange}>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                              <button onClick={saveEdit}>Save</button>
                              <button className="cancel-button" onClick={() => setEditingTask(null)}>Cancel</button>
                            </div>
                          ) : (
                            <p>{task.description || 'No description provided.'}</p>
                          )}

                          <div className="actions">
                            <button onClick={(e) => { e.stopPropagation(); toggleComplete(task.id); }}>
                              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}>
                              Delete
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); startEditing(task); }}>
                              Edit
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      {renderSection('Upcoming Tasks', upcomingTasks)}
      {renderSection('Overdue Tasks', overdueTasks)}
      {renderSection('Completed Tasks', completedTasks)}
    </div>
  );
};
export default Dashboard;
