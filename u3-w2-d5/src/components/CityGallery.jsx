import { Row } from "react-bootstrap";
import CityCard from "./CityCard";

const CityGallery = () => {
  return (
    <Row>
      <CityCard name="Caserta" lat="41.0820827" lon="14.334708" />
      <CityCard name="Turin" lat="45.0677551" lon="7.6824892" />
      <CityCard name="Milan" lat="45.4641943" lon="9.1896346" />
      <CityCard name="Florence" lat="43.7698712" lon="11.2555757" />
      <CityCard name="Naples" lat="40.8358846" lon="14.2487679" />
    </Row>
  );
};
export default CityGallery;
