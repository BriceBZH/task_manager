import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [filter, setFilter] = useState("all");
  // Fonction pour modifier une tâche
  function handleEditChange(id, newName) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, name: newName } : task
    ));
  }

  useEffect(() => {
    if (tasks.length > 0) {
      console.log("Tâches mises à jour : ", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (Array.isArray(storedTasks)) {
      setTasks(storedTasks);
    } else {
      setTasks([]);  // ou les valeurs par défaut
    }
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <>
      <div>
        <h1>Gestionnaire de tâches</h1>

        <div>
          <button onClick={() => setFilter("all")}>Toutes</button>
          <button onClick={() => setFilter("completed")}>Terminées</button>
          <button onClick={() => setFilter("incomplete")}>Non terminées</button>
        </div>
        
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              {task.isEditing ? (
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleEditChange(task.id, e.target.value)}
                  onBlur={() => setTasks(tasks.map(t =>
                    t.id === task.id ? { ...t, isEditing: false } : t
                  ))}
                  autoFocus
                />
              ) : (
                <span>{task.name} - {task.completed ? "✔" : "❌"}</span>
              )}
              <button onClick={() => 
                setTasks(tasks.map(t => 
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                ))
              }>
                Toggle  {/* Change l'état "complété" de la tâche */}
              </button>
              <button onClick={() =>
                setTasks(tasks.map(t =>
                  t.id === task.id ? { ...t, isEditing: true } : t
                ))
              }>
                Modify
              </button>
              <button onClick={() => 
                setTasks(tasks.filter(t => 
                  t.id !== task.id
                ))
              }>
                Delete
              </button>
            </li>
          ))}
        </ul>
      
        <input 
          type="text" 
          placeholder='Nom de la tâche' 
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} 
        />
        <button onClick={() => {
          if (taskName.trim() !== "") {
            setTasks([
              ...tasks,
              {
                id: Date.now(), 
                name: taskName,
                completed: false,
                isEditing: false             
              }
            ]);      
            setTaskName(""); // Réinitialise l'input après l'ajout
          }
        }}>
          Add
        </button>
      </div>
    </>
  )
}

export default App