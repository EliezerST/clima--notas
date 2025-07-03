import axios from "axios"; 

const API_KEY = "2b07c3a501ee1fd5ee59740593d8f150";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function getWeatherDate(city, date) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        lang: "pt_br",
        units: "metric",
      },
    });
    
    console.log(response)

    // Filtra previsões que começam com a data (ex: "2024-07-01")
        const forecastList = response.data.list;
        const previsoesDoDia = forecastList.filter(p =>
      p.dt_txt.startsWith(date)
    );

    return previsoesDoDia[0] || null; // Retorna a primeira previsão do dia, ou null

    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        return null;
    }
}