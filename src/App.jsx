import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  const removeTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
    if (editIndex === index) setEditIndex(null); // Cancel edit if task is removed
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditInput(tasks[index]);
  };

  const saveEdit = (index) => {
    if (editInput.trim() !== '') {
      const updated = [...tasks];
      updated[index] = editInput;
      setTasks(updated);
      setEditIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditInput('');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow-lg rounded-4">
            <div className="card-header bg-primary text-white text-center">
              <h2 className="mb-0">To-Do List</h2>
            </div>
            <div className="card-body p-4">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a task"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                />
                <button onClick={addTask} className="btn btn-success px-4">
                  Add
                </button>
              </div>

              {tasks.length === 0 ? (
                <p className="text-center text-muted">No tasks added yet</p>
              ) : (
                <ol className="list-group list-group-numbered">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {editIndex === index ? (
                        <div className="w-100 d-flex gap-2">
                          <input
                            type="text"
                            className="form-control"
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                          />
                          <button
                            onClick={() => saveEdit(index)}
                            className="btn btn-sm btn-outline-success"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <span>{task}</span>
                          <div>
                            <button
                              onClick={() => startEditing(index)}
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeTask(index)}
                              className="btn btn-sm btn-outline-danger"
                            >
                              Remove
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
