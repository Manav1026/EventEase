import express from "express";
import { products } from "../config/mongoCollection.js";

const router = express.Router();

router.post("/addproduct", async (req, res) => {
  const {
    name, 
    sku,
    description,
    price,
    discountedPrice,
    color,
    size,
    status,
    quantity,
    category,
    relatedProductId,
    mediaUrl,
    mediaType } = req.body;

  if (!name || !sku || !description || !price) {
    return res.status(400).json({
      error: "Name, sku, description, price are required field.",
    });
  }
  

  try {
    const productCollection = await products();

    const newProduct = {
        name,
        sku,
        description,
        price: parseFloat(price),
        discountedPrice: parseFloat(discountedPrice || 0),
        color,
        size,
        status,
        quantity: parseInt(quantity),
        category,
        relatedProductId,
        mediaUrl,
        mediaType
    };

    await productCollection.insertOne(newProduct);

    return res.status(201).json({
      message: "Product successfully stored in MongoDB",
      product: newProduct,
    });
  } catch (error) {
    console.error("MongoDB insert error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
