import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Apprendre React", completed: false },
    { id: 2, name: "Créer une app", completed: false },
    { id: 3, name: "Faire des tests", completed: false },
  ]);
  const [taskName, setTaskName] = useState("");

  return (
    <>
      <div>
      <h1>Gestionnaire de tâches</h1>
      <ul>
          {tasks.map((task) => (
            <li key={task.id}>
            {task.name} - {task.completed ? "✔" : "❌"}  {/* Affiche l'état de la tâche */}
            <button onClick={() => 
              setTasks(tasks.map(t => 
                t.id === task.id ? { ...t, completed: !t.completed } : t
              ))
            }>
              Toggle  {/* Change l'état "complété" de la tâche */}
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
            }
          ]);
          setTaskName(""); // Réinitialise l'input après l'ajout
        }
      }}>
        Ajouter
      </button>
      </div>
    </>
  )
}

export default App