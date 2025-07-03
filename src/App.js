import "./App.css"

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {format} from "date-fns"
import TaskList from './components/TaskList'
import TarefaCriada from "./components/TarefaCriada"


function App() {
  const [ selectDate, setSelectDate ] = useState(new Date()); 
  const [showModal, setShowModal] = useState(false)
  const [task, setTasks] = useState([]);

  // Carrega tarefas salvas no início
  useEffect(() => {
    const armazenadas = localStorage.getItem("tasks");
    if (armazenadas) {
      setTasks(JSON.parse(armazenadas));
    }
  }, []);

  // Salva sempre que as tarefas mudam
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div>
      <Calendar
      onChange={setSelectDate}
      value={selectDate}
      className="date"
      nextLabel={null}
      navigationLabel={null}
      prevLabel={null}
      />
    <div className="tarefas-container">
      <h2>Tarefas para: {format(selectDate, "dd/MM/yyyy")}</h2>
      
      <TaskList date={selectDate} tasks={task} />
      
      <button
        onClick={() => setShowModal(true)}
        className="buttom"
        >
        Adicionar Tarefa
      </button>
        {showModal && (
          <TarefaCriada
            onAdd={handleAddTask}
            onClose={() => setShowModal(false)}
            selectedDate={selectDate}
            />
        )}
    </div>
    
    </div>
  );
}

export default App;
