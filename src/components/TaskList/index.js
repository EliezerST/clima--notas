import { useEffect, useState } from "react";
import { format, isValid } from "date-fns";
import { getWeatherDate } from "../../services/getWeatherDate";
import './tasklist.css';

export default function TaskList({ date, tasks = [] }) {
  const [weather, setWeather] = useState(null);

  const dataFormatada = isValid(date)
    ? format(date, "yyyy-MM-dd")
    : null;

  // Filtro direto sem estado extra
  const filteredTasks = tasks.filter((task) => task.date === dataFormatada);

  // Busca o clima
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

  // Logs úteis
  useEffect(() => {
    console.log("Data selecionada formatada:", dataFormatada);
    console.log("Todas as tarefas:", tasks);
    console.log("Tarefas filtradas:", filteredTasks);
  }, [dataFormatada, tasks]);

  return (
    <div className="tempo-graus">
      {/* Clima */}
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

      {/* Lista de Tarefas */}
      <h3 className="mt-4">Tarefas do dia:</h3>
      {filteredTasks.length > 0 ? (
        <ul className="list-tarefa">
          {filteredTasks.map((task, i) => (
            <li key={i}>{task.title}</li>
          ))}
        </ul>
      ) : (
        <p>Sem tarefas para esse dia.</p>
      )}
    </div>
  );
}
