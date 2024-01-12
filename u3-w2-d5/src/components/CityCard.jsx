import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CityCard = (props) => {
  const [cityWeather, setCityWeather] = useState(null);
  const navigate = useNavigate();

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=ac08c6ac6f393d13c78748606f91495a`
      );
      if (response.ok) {
        const dataFetched = await response.json();
        setCityWeather(dataFetched);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Col onClick={() => navigate("/details/" + cityWeather.city.coord.lat + "/" + cityWeather.city.coord.lon)}>
      <div className="d-flex flex-column align-items-center justify-content-center text-white darkhover border border-white rounded">
        <div>
          {cityWeather && (
            <span className="fs-6">
              {cityWeather.list[0].weather[0].main === "Clear" &&
                `${(cityWeather.list[0].main.temp - 273).toFixed(0)}° ☀️`}
              {cityWeather.list[0].weather[0].main === "Rain" &&
                `${(cityWeather.list[0].main.temp - 273).toFixed(0)}° 🌧️`}
              {cityWeather.list[0].weather[0].main === "Clouds" &&
                `${(cityWeather.list[0].main.temp - 273).toFixed(0)}° 🌥️`}
            </span>
          )}
        </div>
        <div className="me-3">
          <span className="fs-4">{props.name}</span>
        </div>
      </div>
    </Col>
  );
};
export default CityCard;
