import { execSync } from 'child_process';
import { platform } from 'os';
import { createClient } from 'redis';

// Function to try running a command and return success/failure
function tryCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch {
    return false;
  }
}

// Attempt to start Redis server (either via Docker or local install)
async function ensureRedisRunning() {
  console.log("🔄 Checking for Docker...");

  if (tryCommand("docker info")) {
    console.log("🐳 Docker is running. Trying docker-compose...");
    if (!tryCommand("docker-compose up -d")) {
      console.error("❌ Failed to start Redis with docker-compose.");
    }
  } else {
    console.log("⚠️ Docker not running or not installed. Trying local Redis...");

    const isWindows = platform() === "win32";
    const redisCmd = isWindows ? "redis-server.exe" : "redis-server";

    if (!tryCommand(`${redisCmd} --version`)) {
      console.error("❌ Redis is not installed locally. Please install Redis or start Docker.");
      process.exit(1);
    }

    console.log("🚀 Starting local Redis...");
    // Start Redis in background so it doesn't block Node
    tryCommand(`${redisCmd} &`);
  }
}

// Ensure Redis is running before connecting
await ensureRedisRunning();

// Initialize Redis client
const client = createClient({
  url: "redis://localhost:6379"
});

client.on("error", (err) => console.error("Redis Client Error", err));

await client.connect();

console.log("✅ Redis client connected.");

export default client;
