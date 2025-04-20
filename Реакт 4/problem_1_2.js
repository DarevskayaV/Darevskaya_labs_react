const { useState } = React;

const ToDoForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

const ToDoItems = ({ tasks, toggleTask, showTasks, filter }) => {
  if (!showTasks) return null;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div>
      {filteredTasks.map((task, index) => (
        <div key={index} className="todo-item">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(index)}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </span>
        </div>
      ))}
    </div>
  );
};

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  const [filter, setFilter] = useState('all');

  const addTask = (text) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleSubmit = () => {
    setShowTasks(!showTasks);
    if (showTasks) {
      setTasks(tasks.filter(task => !task.completed));
    }
  };

  return (
    <div className="todo-container">
      <h1>ToDo List</h1>
      <ToDoForm addTask={addTask} />
      {showTasks && (
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      )}
      <ToDoItems 
        tasks={tasks} 
        toggleTask={toggleTask} 
        showTasks={showTasks}
        filter={filter}
      />
      <button className="submit-btn" onClick={handleSubmit}>
        {showTasks ? 'Update List' : 'Show Tasks'}
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ToDoList />);