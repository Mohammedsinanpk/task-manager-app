// src/components/TaskList.js
import React, { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask, editTask }) => {
  const [sortOption, setSortOption] = useState('date');
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingData, setEditingData] = useState({
    title: '',
    dueDate: '',
    priority: '',
    description: '',
  });

  // Sort tasks based on selected option
  const sortedTasks = [...tasks];
  if (sortOption === 'date') {
    sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortOption === 'priority') {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    sortedTasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  // Toggle expansion of a task row
  const toggleExpand = (id) => {
    if (expandedTasks.includes(id)) {
      setExpandedTasks(expandedTasks.filter((taskId) => taskId !== id));
      if (editingTaskId === id) {
        setEditingTaskId(null);
      }
    } else {
      setExpandedTasks([...expandedTasks, id]);
    }
  };

  // Begin editing for a task
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingData({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
      description: task.description,
    });
  };

  // Update local editing state as user types
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingData({ ...editingData, [name]: value });
  };

  // Save the updated task
  const saveEdit = (id) => {
    const updatedTask = { id, ...editingData };
    editTask(updatedTask);
    setEditingTaskId(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="task-list-container">
      <div className="sort-options">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      {sortedTasks.length === 0 ? (
        <p className="no-tasks-message">No tasks added yet.</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <React.Fragment key={task.id}>
                <tr className="task-row" onClick={() => toggleExpand(task.id)}>
                  <td>{task.title}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    <span className={`priority-label ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                </tr>
                {expandedTasks.includes(task.id) && (
                  <tr className="description-row" onClick={(e) => e.stopPropagation()}>
                    <td colSpan="3">
                      {editingTaskId === task.id ? (
                        <div className="edit-form">
                          <div className="form-group">
                            <label>Title</label>
                            <input
                              type="text"
                              name="title"
                              value={editingData.title}
                              onChange={handleEditChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Due Date</label>
                            <input
                              type="date"
                              name="dueDate"
                              value={editingData.dueDate}
                              onChange={handleEditChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Priority</label>
                            <select
                              name="priority"
                              value={editingData.priority}
                              onChange={handleEditChange}
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              name="description"
                              value={editingData.description}
                              onChange={handleEditChange}
                            ></textarea>
                          </div>
                          <div className="edit-buttons">
                            <button className="save-button" onClick={() => saveEdit(task.id)}>
                              Save
                            </button>
                            <button className="cancel-button" onClick={cancelEdit}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="task-details">
                          <p className="task-description">
                            {task.description || 'No description provided.'}
                          </p>
                          <div className="expanded-buttons">
                            <button className="edit-button" onClick={() => startEditing(task)}>
                              Edit
                            </button>
                            <button className="delete-button" onClick={() => deleteTask(task.id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
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

export default TaskList;
