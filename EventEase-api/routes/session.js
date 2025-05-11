import express from "express";
import { users } from "../config/mongoCollection.js";
import admin from "../config/adminFirbase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("I am inside");

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const usersCollection = await users();
    const user = await usersCollection.findOne({ firebaseUid: uid });

    const currentVersion = global.SERVER_SESSION_VERSION;
    if (!user || user.sessionVersion !== currentVersion) {
      return res.status(401).json({ error: "Session expired" });
    }

    res.status(200).json({ message: "OK" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid session" });
  }
});

export default router;
