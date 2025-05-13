import userRoute from "./users.js";
import productRoute from "./products.js";
import sessionRoute from "./session.js";
import productsRoute from "./singleProduct.js";
import allProductsRoute from "./allProducts.js"
import orderRoutes from "./orders.js";

const constructorMethod = (app) => {
  app.use("/api/users", userRoute);
  app.use("/api/vendor", productRoute);
  app.use("/api/session", sessionRoute);
  app.use("/api/products", productsRoute);
  app.use("/api/all-products", allProductsRoute);
  app.use("/orders", orderRoutes);
  console.log("here");

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
