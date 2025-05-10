import admin from "firebase-admin";
import { readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const service_path = process.env.FIREBASE_SERVICE_JSON;

if (!service_path) {
  throw new Error("Missing Firebase SDK in .env");
}

const serviceAccount = JSON.parse(service_path);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// const serviceAccount = JSON.parse(service_path);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
