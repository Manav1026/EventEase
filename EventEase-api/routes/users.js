// routes/userRoutes.js
import express from "express";
import { users } from "../config/mongoCollection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async (req, res) => {
  const { uid, fullName, email, role } = req.body;

  if (!uid || !fullName || !email || !role) {
    return res.status(400).json({
      error: "All fields (uid, fullName, email, role) are required.",
    });
  }

  try {
    const usersCollection = await users();

    const newUser = {
      firebaseUid: uid,
      fullName,
      email,
      role,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    return res.status(201).json({
      message: "User successfully stored in MongoDB",
      user: newUser,
    });
  } catch (error) {
    console.error("MongoDB insert error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
