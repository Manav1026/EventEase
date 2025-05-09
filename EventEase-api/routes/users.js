import express from "express";
import multer from "multer";
import path from "path";
import { exec } from "child_process";
import { users } from "../config/mongoCollection.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  const { uid, fullName, email, role, phoneNumber, address } = req.body;

  if (!uid || !email || !role || !fullName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const usersCollection = await users();

  let profilePictureUrl = null;

  try {
    if (req.file) {
      const inputPath = req.file.path;
      const outputFileName = `resized_${req.file.filename}.jpg`;
      const outputPath = path.join("uploads", outputFileName);
      const command = `magick "${inputPath}" -resize 150x150 "${outputPath}"`;

      await new Promise((resolve, reject) => {
        exec(command, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      profilePictureUrl = `/uploads/${outputFileName}`;
    }

    const result = await usersCollection.updateOne(
      { firebaseUid: uid },
      {
        $set: {
          fullName,
          email,
          role,
          phoneNumber: phoneNumber || null,
          address: address || null,
          updatedAt: new Date(),
          ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
        },
        $setOnInsert: {
          createdAt: new Date(),
          profilePicture: profilePictureUrl || null,
        },
      },
      { upsert: true }
    );

    const message = result.upsertedCount
      ? "User created successfully"
      : "User updated successfully";

    const updatedUser = await usersCollection.findOne(
      { firebaseUid: uid },
      {
        projection: {
          _id: 0,
          fullName: 1,
          email: 1,
          role: 1,
          profilePicture: 1,
          createdAt: 1,
          phoneNumber: 1,
          address: 1,
        },
      }
    );

    return res.status(200).json({
      message,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error uploading user:", error);
    return res.status(500).json({ error: "Failed to store user" });
  }
});

router.get("/profile/:uid", async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: "UID is required" });
  }

  try {
    const usersCollection = await users();
    const user = await usersCollection.findOne(
      { firebaseUid: uid },
      {
        projection: {
          _id: 0,
          fullName: 1,
          email: 1,
          role: 1,
          profilePicture: 1,
          createdAt: 1,
          phoneNumber: 1,
          address: 1,
        },
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Failed to fetch profile picture:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.patch("/profile-picture", upload.single("image"), async (req, res) => {
  const { uid } = req.body;

  if (!uid || !req.file) {
    return res.status(400).json({ error: "Missing UID or image" });
  }

  try {
    const inputPath = req.file.path;
    const outputFileName = `resized_${req.file.filename}.jpg`;
    const outputPath = path.join("uploads", outputFileName);
    const command = `magick "${inputPath}" -resize 150x150 "${outputPath}"`;

    await new Promise((resolve, reject) => {
      exec(command, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const profilePictureUrl = `/uploads/${outputFileName}`;

    const usersCollection = await users();

    const result = await usersCollection.updateOne(
      { firebaseUid: uid },
      { $set: { profilePicture: profilePictureUrl } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found or not updated" });
    }

    return res.status(200).json({
      message: "Profile picture updated",
      profilePicture: profilePictureUrl,
    });
  } catch (error) {
    console.error("Profile picture update failed:", error);
    return res.status(500).json({ error: "Failed to update profile picture" });
  }
});

export default router;
