# Практическое задание: Создание React приложения со списком задач

## Шаг 1: Создание проекта

1. Откройте терминал и выполните команду:

```bash
npm create vite@latest my-todo-app -- --template react
```

2. Перейдите в созданную директорию:

```bash
cd my-todo-app
```

3. Установите зависимости:

```bash
npm install
```

## Шаг 2: Очистка проекта

1. Удалите ненужные файлы из папки `src`:

   - `App.css`
   - `index.css`
   - `assets/react.svg`

2. Очистите содержимое `App.jsx`:

```jsx
function App() {
  return (
    <div>
      <h1>Мой список задач</h1>
    </div>
  );
}

export default App;
```

3. Очистите содержимое `main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

## Шаг 3: Создание компонента задачи

1. Создайте файл `src/widgets/Task.jsx`:

```jsx
function Task({ task, onDelete }) {
  return (
    <div className='task'>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </div>
  );
}

export default Task;
```

## Шаг 4: Создание формы для добавления задач

1. Создайте файл `src/widgets/TaskForm.jsx`:

```jsx
import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Название:</label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='description'>Описание:</label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type='submit'>Добавить задачу</button>
    </form>
  );
}

export default TaskForm;
```

## Шаг 5: Обновление App.jsx

1. Обновите содержимое `App.jsx`:

```jsx
import { useState } from 'react';
import Task from './widgets/Task';
import TaskForm from './widgets/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>Мой список задач</h1>
      <TaskForm onAddTask={handleAddTask} />
      <div className='tasks-list'>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
}

export default App;
```

## Шаг 6: Добавление базовых стилей

1. Создайте файл `src/styles.css`:

```css
.task {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}

.task h3 {
  margin: 0;
  color: #333;
}

.task p {
  margin: 5px 0;
  color: #666;
}

.task button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.task button:hover {
  background-color: #cc0000;
}

form {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input,
form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #45a049;
}
```

2. Импортируйте стили в `main.jsx`:

```jsx
import './styles.css';
```

## Шаг 7: Запуск приложения

1. Запустите сервер разработки:

```bash
npm run dev
```

2. Откройте браузер и перейдите по адресу: http://localhost:5173
