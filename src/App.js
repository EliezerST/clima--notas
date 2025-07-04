import "./App.css"

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {format} from "date-fns"
import TaskList from './components/TaskList'
import TarefaCriada from "./components/TarefaCriada"


function App() {
  const [ selectDate, setSelectDate ] = useState(new Date()); 
  const [showModal, setShowModal] = useState(false)

  // Inicializa direto lendo do localStorage
  const [task, setTasks] = useState(() => {
    const armazenadas = localStorage.getItem("tasks");
    return armazenadas ? JSON.parse(armazenadas) : [];
  });

  // Salva no localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);


  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // Deletar Tarefa
  const handleDeleteTask = (indexToDelete) => {
  const novasTarefas = task.filter((_, i) => i !== indexToDelete);
  setTasks(novasTarefas);
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
      tileClassName={({ date, view }) => {
          if (view === "month") {
          const dataFormatada = format(date, "yyyy-MM-dd");
          const temTarefa = task.some((t) => t.date === dataFormatada);
          return temTarefa ? "dia-com-tarefa" : null;
        }
      }}
      />
    <div className="tarefas-container">
      <h2>Tarefas para: {format(selectDate, "dd/MM/yyyy")}</h2>
      
      <TaskList date={selectDate} tasks={task} onDelete={handleDeleteTask} />
      
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
