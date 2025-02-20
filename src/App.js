// src/App.js
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TaskModal from './components/TaskModal';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>
        Add Task
      </button>
      <Dashboard tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} editTask={editTask} />
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addTask={addTask} />
    </div>
  );
}

export default App;
