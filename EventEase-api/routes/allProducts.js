import express from "express";
import { products } from "../config/mongoCollection.js";
import client from "../redisClient.js"
const router = express.Router();

router.get("/", async (req, res) => {
  try { //→ grabbing just from DB
    let exists = await client.exists("allProducts");
    if (exists) { //already in cache, laod from cache and display
        console.log("products found in cache.");
        let allProducts = JSON.parse(await client.get("allProducts"));
        res.json(allProducts);
    } else {
      console.log("attempt to show data - not in cache")
      const productColl = await products();
      const allProducts = await productColl.find({}).toArray();
      await client.set("allProducts", JSON.stringify(allProducts), { EX: 3600 });
      res.json(allItems);
      console.log("sucessw")
    }
  } catch (e) {
    console.log("fail")
    res.status(500).json({ error: e.message });
  }
});

export default router;