import { useState } from "react";
import { format } from "date-fns";
import './tarefa.css';

export default function AddTaskModal({ onClose, onAdd, selectedDate }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Preencha o título da tarefa.");
      return;
    }

    const newTask = {
      title: title.trim(),
      date: format(selectedDate, "yyyy-MM-dd"), 
    };

    onAdd(newTask);
    onClose();
  };

  return (
    <div className="container">
      <div>
        <h2>Adicionar Tarefa</h2>
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            placeholder="Título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
            <button type="button" onClick={onClose} >
              Cancelar
            </button>
            <button type="submit" className="buttom-start">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
