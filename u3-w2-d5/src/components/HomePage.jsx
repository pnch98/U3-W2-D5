import { useEffect, useState } from "react";
import { Col, Container, FormControl, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DayGallery from "./DayGallery";
import CityGallery from "./CityGallery";

const HomePage = () => {
  const [cityWeather, setCityWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=41.8933203&lon=12.4829321&appid=ac08c6ac6f393d13c78748606f91495a`
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
    cityWeather && (
      <div
        className={`${
          cityWeather &&
          ((cityWeather.list[0].weather[0].main === "Clear" && "sunny") ||
            (cityWeather.list[0].weather[0].main === "Rain" && "rainy"))
        }`}
      >
        <Container className="py-5" style={{ height: "100vh" }}>
          <Row className="bg-row p-3 h-100">
            <Col
              md={3}
              className="bg-banners border border-3 border-light border-top-0 border-start-0 border-bottom-0 p-2"
            >
              <div className="d-flex flex-column justify-content-between text-white h-100 me-2 py-3">
                <div>
                  <FormControl placeholder="Cerca città" className="rounded-pill mb-5 mt-2" />
                </div>
                <div>
                  <p className="display-2 fw-bold">Rome</p>
                </div>
                <div>
                  <p className="display-4 fw-bold">
                    {cityWeather
                      ? (cityWeather.list[0].main.temp - 273).toFixed(0) +
                        "° ± " +
                        cityWeather.list[0].main.temp_kf.toFixed(1)
                      : "/"}
                  </p>
                  <p className="fs-6 mb-0">humidity: {cityWeather.list[0].main.humidity}</p>
                  <p className="fs-6 mb-0">wind: </p>
                  <p className="fs-6 ms-3 m-0">speed: {cityWeather.list[0].wind.speed}</p>
                  <p className="fs-6 ms-3 m-0">deg: {cityWeather.list[0].wind.deg}</p>
                  <p className="fs-6 ms-3 m-0">gust: {cityWeather.list[0].wind.gust}</p>
                </div>
              </div>
            </Col>
            <Col className="bg-banners p-2">
              <div className="d-flex flex-column justify-content-between h-100 text-white ms-2 py-3">
                <h1 className="text-white mb-5">EpiWeather</h1>
                <div>
                  <div className="text-center">
                    <Link className="active btn rounded-pill" disabled>
                      Today
                    </Link>
                    <Link
                      to={`/details/tomorrow/${cityWeather.city.coord.lat}/${cityWeather.city.coord.lon}`}
                      className="btn rounded-pill"
                    >
                      Tomorrow
                    </Link>
                    <Link className="btn rounded-pill">Next 5 days</Link>
                  </div>
                  <p className="display-1 mb-0"> {cityWeather.list[0].weather[0].main}</p>
                  <p className="display-6 mb-5"> {cityWeather.list[0].weather[0].description}</p>
                  <DayGallery list={cityWeather.list} />
                </div>
                <div>
                  <CityGallery />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};
export default HomePage;
