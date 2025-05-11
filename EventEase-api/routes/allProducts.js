import express from "express";
import { products } from "../config/mongoCollection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("attempt to show data")
    const productColl = await products();
    const allItems = await productColl.find({}).toArray();
    res.json(allItems);
    console.log("sucess")
  } catch (e) {
    console.log("fail")
    res.status(500).json({ error: e.message });
  }
});

export default router;