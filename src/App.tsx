import * as React from 'react';
import { todoStore } from './state';
import './style.css';

export default function App() {
  const [tasks, setTasks] = React.useState([]);
  const [newTaskContent, setNewTaskContent] = React.useState('');
  const [showCompletedTasks, setShowCompletedTasks] =
    React.useState<boolean>(true);
  todoStore.subscribe((val) => setTasks(val));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskContent(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  function addTask() {
    todoStore.addTask(newTaskContent);
    setNewTaskContent('');
  }

  function deleteTask(id: string) {
    todoStore.removeTask(id);
  }

  function completeTask(id: string) {
    todoStore.completeTask(id);
  }

  function toggleCompletedTasks(event: React.ChangeEvent<HTMLInputElement>) {
    setShowCompletedTasks(event.target.checked);
  }

  return (
    <div className="m-3">
      <h1>Todo list</h1>
      <p>To make your work easier.</p>
      <div>
        <h2>Tasks:</h2>
        <small>
          <input
            type="checkbox"
            checked={showCompletedTasks}
            onChange={toggleCompletedTasks}
          />
          Show completed tasks
        </small>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                value={task.isDone}
                onChange={() => completeTask(task.id)}
              />
              {task.isDone ? (
                <span style={{ textDecoration: 'line-through' }}>
                  {task.content}
                </span>
              ) : (
                <span>{task.content}</span>
              )}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <h3>Add a task:</h3>
        <div className="d-flex flex-row justify-content-between">
          <input
            type="text"
            value={newTaskContent}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-75"
          />
          <button onClick={addTask}>Add</button>
        </div>
      </div>
      <ul>
        {tasks.map((task) => (
          <li>{task.content}</li>
        ))}
      </ul>
    </div>
  );
}
