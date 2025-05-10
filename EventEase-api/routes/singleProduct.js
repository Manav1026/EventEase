import express from "express";
import { products } from "../config/mongoCollection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log("Getting prodcut with ID: ", id)
    try {
        const productCollection = await products();
        const product = await productCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error", error);
        return res.status(404).json({ error: "Product not found" });
    }
});

export default router;
