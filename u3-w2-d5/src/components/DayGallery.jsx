import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const DayGallery = (props) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    const currentDate = props.list[0].dt_txt.split(" ")[0];
    const myList = props.list.filter((date) => date.dt_txt.split(" ")[0] === currentDate);
    setList(myList);
  }, []);
  return (
    list && (
      <Row md={8} className="mb-5">
        {list.map((timestamp) => (
          <Col key={timestamp.dt}>
            <div className="d-flex flex-column align-items-center justify-content-center text-white border border-white rounded">
              <p className="fs-6 mb-0">{timestamp.dt_txt.split(" ")[1]}</p>
              <p className="fs-4 mb-0">{(timestamp.main.temp - 273).toFixed(0)}°</p>
            </div>
          </Col>
        ))}
      </Row>
    )
  );
};
export default DayGallery;
