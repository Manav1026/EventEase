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
import { Admin } from "./components/Admin";
import EditProduct from "./components/EditProduct";

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
                element={<AddProduct></AddProduct>}>
              </Route>
              <Route path="/admin" element={<Admin></Admin>}></Route>
              <Route
                path="/editProduct/:id"
                element={<EditProduct></EditProduct>}>
              </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
