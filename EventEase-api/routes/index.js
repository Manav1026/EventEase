import userRoute from "./users.js";
import productRoute from "./addProduct.js";
import sessionRoute from "./session.js";

const constructorMethod = (app) => {
  app.use("/api/users", userRoute);
  app.use("/api/vendor", productRoute);
  app.use("/api/session", sessionRoute);
  console.log("here");

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
