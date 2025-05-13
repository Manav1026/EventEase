import express from "express";
import { products } from "../config/mongoCollection.js";
import { ObjectId } from "mongodb";
const router = express.Router();
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });
router.post("/addproduct", upload.single("media"), async (req, res) => {
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
    vendorId,
  } = req.body;

  if (!name || !sku || !description || !price) {
    return res.status(400).json({
      error: "Name, sku, description, price are required field.",
    });
  }

  try {
    const productCollection = await products();
    const existing = await productCollection.findOne({ sku });
    if (existing) {
      return res.status(409).json({ error: "SKU must be unique." });
    }
    // mediaUrl = req.file ? `/uploads/${req.file.filename}` : "";
    // mediaType = req.file
    //   ? req.file.mimetype.startsWith("video/")
    //     ? "video"
    //     : "image"
    //   : "";

    let mediaUrl = "";
    let mediaType = "";

    if (req.file) {
      const isVideo = req.file.mimetype.startsWith("video/");
      const ext = isVideo ? ".mp4" : ".jpg";
      const fileName = `product_${Date.now()}${ext}`;
      const outputPath = path.join("uploads", fileName);

      fs.renameSync(req.file.path, outputPath);

      mediaUrl = `/uploads/${fileName}`;
      mediaType = isVideo ? "video" : "image";
    }
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
      mediaType,
      vendorId,
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

router.get("/products/:uid", async (req, res) => {
  const { uid } = req.params;
  // console.log("this is uid");
  // console.log(uid);
  if (!uid) {
    return res.status(400).json({ error: "UID is required" });
  }
  try {
    const productCollection = await products();
    const productData = await productCollection
      .find({ vendorId: uid })
      .toArray();

    if (!productData) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(productData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});
router.get("/check-sku/:sku", async (req, res) => {
  const { sku } = req.params;
  const productCollection = await products();
  const existing = await productCollection.findOne({ sku });
  res.json({ exists: !!existing });
});
router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  //console.log(id)
  try {
    const productCollection = await products();
    const result = await productCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not deleted" });
    }
    res.json({ deleted: result.deletedCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/products/bulk-delete", async (req, res) => {
  try {
    const ids = req.body.ids.map((id) => new ObjectId(id));
    const productCollection = await products();
    const result = await productCollection.deleteMany({ _id: { $in: ids } });

    if (!result) {
      return res.status(404).json({ error: "Product not deleted" });
    }
    res.json({ deleted: result.deletedCount });
  } catch (e) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});
router.get("/editProduct/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productCollection = await products();
    const product = await productCollection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.patch("/editProduct/:id", upload.single("media"), async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const updates = { ...req.body };
    delete updates._id;

    if (updates.price) updates.price = parseFloat(updates.price);
    if (updates.discountedPrice)
      updates.discountedPrice = parseFloat(updates.discountedPrice);
    if (updates.quantity) updates.quantity = parseInt(updates.quantity);

    if (req.file) {
      const ext = req.file.mimetype.startsWith("video/") ? ".mp4" : ".jpg";
      const fileName = `product_${Date.now()}${ext}`;
      const outputPath = path.join("uploads", fileName);

      fs.renameSync(req.file.path, outputPath);

      updates.mediaUrl = `/uploads/${fileName}`;
      updates.mediaType = req.file.mimetype.startsWith("video/")
        ? "video"
        : "image";
    }

    const productCollection = await products();

    if (updates.sku) {
      const existing = await productCollection.findOne({
        sku: updates.sku,
        _id: { $ne: new ObjectId(id) },
      });

      if (existing) {
        return res.status(409).json({ error: "SKU must be unique." });
      }
    }

    const result = await productCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or not updated" });
    }

    res.json({
      message: "Product updated successfully",
      mediaUrl: updates.mediaUrl,
    });
  } catch (error) {
    console.error("Product update failed:", error);
    res.status(500).json({ error: "Update failed" });
  }
});
export default router;
