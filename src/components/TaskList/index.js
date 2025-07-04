import { useEffect, useState } from "react";
import { format, isValid } from "date-fns";
import { getWeatherDate } from "../../services/getWeatherDate";
import './tasklist.css';

export default function TaskList({ date, tasks = [], onDelete }) {
  const [weather, setWeather] = useState(null);

  // Formata a data selecionada para "yyyy-MM-dd" se for válida
  const dataFormatada = isValid(date)
    ? format(date, "yyyy-MM-dd")
    : null;

  // Filtra as tarefas que são da data selecionada
  const filteredTasks = tasks.filter((task) => task.date === dataFormatada);

  // Efeito para buscar clima da cidade (exemplo: São Paulo) para a data selecionada
  useEffect(() => {
    async function fetchWeather() {
      const city = "Sao Paulo";

      if (isValid(date)) {
        try {
          const weatherData = await getWeatherDate(city, dataFormatada);
          setWeather(weatherData);
        } catch (error) {
          console.error("Erro ao buscar clima:", error);
          setWeather(null);
        }
      } else {
        setWeather(null);
      }
    }

    fetchWeather();
  }, [date]);

  // Logs para debug
  useEffect(() => {
    console.log("Data selecionada formatada:", dataFormatada);
    console.log("Todas as tarefas:", tasks);
    console.log("Tarefas filtradas:", filteredTasks);
  }, [dataFormatada, tasks]);

  return (
    <div className="tempo-graus">
      {/* Exibe o clima */}
      {weather ? (
        <div className="tempo">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <span className="text-lg">
            {weather.weather[0].description} – {weather.main.temp.toFixed(1)}°C
          </span>
        </div>
      ) : (
        <p>Carregando clima...</p>
      )}

      {/* Lista de tarefas */}
      <h3 className="mt-4">Tarefas do dia:</h3>
      {filteredTasks.length > 0 ? (
        <ul className="list-tarefa">
          {filteredTasks.map((task, i) => {
            // Aqui encontra o índice real da tarefa no array geral "tasks"
            const indiceReal = tasks.findIndex(
              (t) => t.date === task.date && t.title === task.title
            );

            return (
              <li key={i}>
                <strong>{task.title}</strong>
                {/* Passa o índice real para a função onDelete */}
                <button
                  onClick={() => onDelete(indiceReal)}
                  className="btn-remover"
                >
                  Remover
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Sem tarefas para esse dia.</p>
      )}
    </div>
  );
}
