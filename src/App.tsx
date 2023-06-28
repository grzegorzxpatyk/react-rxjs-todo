import * as React from 'react';
import { combinedObservable, showCompletedStore, todoStore } from './state';
import './style.css';

export default function App() {
  const [tasks, setTasks] = React.useState([]);
  const [newTaskContent, setNewTaskContent] = React.useState('');
  const [showCompletedTasks, setShowCompletedTasks] =
    React.useState<boolean>(true);

  React.useLayoutEffect(() => {
    todoStore.subscribe((val) => setTasks(val));
    todoStore.init();
    showCompletedStore.subscribe((val) => setShowCompletedTasks(val));
    showCompletedStore.init();
    combinedObservable.subscribe(([todos, showCompleted]: any) => {
      if (!showCompleted) {
        setTasks(todos.filter((todo) => todo.isDone === showCompleted));
      } else {
        setTasks(todos);
      }
    });
  }, []);

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
    showCompletedStore.setShowCompleted(event.target.checked);
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
            className="me-2"
          />
          Show completed tasks
        </small>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="d-flex flex-row justify-content-between align-items-center my-1"
            >
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
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
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
          <button type="button" className="btn btn-dark" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={`2ndlist-${task.id}`}>{task.content}</li>
        ))}
      </ul>
    </div>
  );
}
