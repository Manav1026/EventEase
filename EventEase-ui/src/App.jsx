import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import "./App.css";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import {AddProduct} from "./components/AddProduct"
import ImportCSV from "./components/ImportCSV";

function App() {
  const handleBulkAdd = (bulkProducts) => {
    setProducts((prev) => [...bulkProducts, ...prev]);
  };
  return(
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/addProduct" element={<AddProduct></AddProduct>}></Route>
            <Route path="/import" element={<ImportCSV onBulkAdd={handleBulkAdd} />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
