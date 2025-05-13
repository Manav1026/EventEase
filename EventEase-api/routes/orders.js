
import express from "express";
import { createOrder } from "../data/orders.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { productIds, customerId, startDate, endDate } = req.body;

    if (!productIds || !customerId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const insertedId = await createOrder(productIds, customerId, startDate, endDate);
    res.status(200).json({ message: "Order created successfully", orderId: insertedId });

  } catch (e) {
    console.error("Error creating order:", e);
    res.status(500).json({ error: e.toString() });
  }
});

export default router;