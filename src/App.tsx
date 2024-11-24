import { Routes, Route } from "react-router-dom";
import Narbar from "./components/navbar";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import Details from "./pages/details";

const App = () => {
  return (
    <div>
      <div className="min-h-screen bg-white p-6 text-lg text-gray-600">
        <Narbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
