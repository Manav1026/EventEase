import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import "./App.css";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { Middleware } from "./components/Middleware";
import { AddProduct } from "./components/AddProduct";
import { EditProduct } from "./components/EditProduct";
import { Admin } from "./components/Admin";
import Product from "./components/Product";
import Checkout from "./components/Checkout";
import ProductsLandingPage from "./components/AllProducts";
import { ErrorPage } from "./components/ErrorPage";
import { CartContextProvider } from "./components/CartContextProvider";

function App() {
  return (
    <CartContextProvider>
      <div>
        <Router>
          <Routes>
            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
            <Route
              path="/"
              element={<ProductsLandingPage></ProductsLandingPage>}></Route>
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
              element={
                <Middleware>
                  <AddProduct></AddProduct>
                </Middleware>
              }></Route>
            <Route
              path="/admin"
              element={
                <Middleware>
                  <Admin></Admin>
                </Middleware>
              }></Route>
            <Route
              path="/editProduct/:id"
              element={
                <Middleware>
                  <EditProduct></EditProduct>
                </Middleware>
              }></Route>
            <Route
              path="/products/:id"
              element={
                <Middleware>
                  <Product />
                </Middleware>
              }
            />
            <Route
              path="/checkout"
              element={
                <Middleware>
                  <Checkout />
                </Middleware>
              }
            />
          </Routes>
        </Router>
      </div>
    </CartContextProvider>
  );
}

export default App;
