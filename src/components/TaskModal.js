import React from 'react';
import TaskForm from './TaskForm';
import './TaskModal.css'; // Confirm this path

const TaskModal = ({ isOpen, onClose, addTask }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <TaskForm addTask={(task) => { 
          addTask(task); 
          onClose();
        }} />
      </div>
    </div>
  );
};

export default TaskModal;
