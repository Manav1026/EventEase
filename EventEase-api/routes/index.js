import userRoute from "./users.js";
import productRoute from "./addProduct.js";
import sessionRoute from "./session.js";
import productsRoute from "./singleProduct.js";
import allProductsRoute from "./allProducts.js"

const constructorMethod = (app) => {
  app.use("/api/users", userRoute);
  app.use("/api/vendor", productRoute);
  app.use("/api/session", sessionRoute);
  app.use("/api/products", productsRoute);
  app.use("/api/all-products", allProductsRoute)
  console.log("here");

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
