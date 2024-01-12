import { Link, useNavigate, useParams } from "react-router-dom";
import DayGallery from "./DayGallery";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const DetailsTomorrow = () => {
  const [cityWeather, setCityWeather] = useState(null);
  const [tomorrowList, setTomorrowList] = useState(null);
  const date = new Date();
  date.setDate(date.getDate() + 1);
  console.log(date);
  const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const tomorrowDate = date.getFullYear() + "-" + month + "-" + date.getDate();
  console.log(tomorrowDate);
  const params = useParams();
  console.log(params);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=ac08c6ac6f393d13c78748606f91495a`
      );
      if (response.ok) {
        const dataFetched = await response.json();
        setCityWeather(dataFetched);
        setTomorrowList(dataFetched.list.filter((time) => time.dt_txt.split(" ")[0] === tomorrowDate));
        console.log(cityWeather);
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
          ((tomorrowList[0].weather[0].main === "Clear" && "sunny") ||
            (tomorrowList[0].weather[0].main === "Rain" && "rainy"))
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
                  <p className="display-2 fw-bold">{cityWeather.city.name}</p>
                </div>
                <div>
                  <p className="display-4 fw-bold">
                    {cityWeather
                      ? (tomorrowList[0].main.temp - 273).toFixed(0) + "° ± " + tomorrowList[0].main.temp_kf.toFixed(1)
                      : "/"}
                  </p>
                  <p className="fs-6 mb-0">humidity: {tomorrowList[0].main.humidity}</p>
                  <p className="fs-6 mb-0">wind: </p>
                  <p className="fs-6 ms-3 m-0">speed: {tomorrowList[0].wind.speed}</p>
                  <p className="fs-6 ms-3 m-0">deg: {tomorrowList[0].wind.deg}</p>
                  <p className="fs-6 ms-3 m-0">gust: {tomorrowList[0].wind.gust}</p>
                </div>
              </div>
            </Col>
            <Col className="bg-banners p-2">
              <div className="h-100 text-white ms-2 py-3">
                <div className="d-flex justify-content-between">
                  <h1 className="text-white mb-5">EpiWeather</h1>
                  <Link to={"/"} className="btn">
                    Go to Home
                  </Link>
                </div>
                <div>
                  <div className="text-center mt-5">
                    <Link to={`/details/${params.lat}/${params.lon}`} className="btn rounded-pill">
                      Today
                    </Link>
                    <Link className="active btn rounded-pill" disabled>
                      Tomorrow
                    </Link>
                    <Link className="btn rounded-pill">Next 5 days</Link>
                  </div>
                  <p className="display-1 mb-0"> {tomorrowList[0].weather[0].main}</p>
                  <p className="display-6 mb-5"> {tomorrowList[0].weather[0].description}</p>
                  <DayGallery list={tomorrowList} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};
export default DetailsTomorrow;
