import userRoute from "./users.js";

const constructorMethod = (app) => {
  app.use("/api/users", userRoute);

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
