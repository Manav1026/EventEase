import express from "express";
import { products } from "../config/mongoCollection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const productColl = await products();
    const allItems = await productColl.find({}).toArray();
    res.json(allItems);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;