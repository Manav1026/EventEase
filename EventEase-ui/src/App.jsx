import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import "./App.css";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { Middleware } from "./components/Middleware";
import { AddProduct } from "./components/AddProduct";
// import Product from "./components/Product";
// import Checkout from "./components/Checkout";
import ProductsLandingPage from "./components/AllProducts";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<ProductsLandingPage></ProductsLandingPage>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route
              path="/dashboard"
              element={
                <Middleware>
                  <Dashboard></Dashboard>
                </Middleware>
              }></Route>
            <Route
              path="/addProduct"
              element={<AddProduct></AddProduct>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
