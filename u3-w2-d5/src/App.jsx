import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage";
import Details from "./components/Details";
import DetailsTomorrow from "./components/DetailsTomorrow";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:lat/:lon" element={<Details />} />
          <Route path="/details/tomorrow/:lat/:lon/" element={<DetailsTomorrow />} />
          <Route path="/details/nextDays/:lat/:lon/" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
