import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateItem from "./components/UpdateItem";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route to dynamically get itemID */}
        <Route path="/doors/:id" element={<UpdateItem />} />
      </Routes>
    </Router>
  );
}

export default App;
