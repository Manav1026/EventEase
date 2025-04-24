import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import "./App.css";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
