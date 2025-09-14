// lib/initRedis.ts
import { getRedisClient } from "./redis";

let initialized = false;

export async function initializeRedis() {
  if (!initialized) {
    try {
      const client = await getRedisClient();

      // Initialize your user balances
      await client.set("user:1:balance", "10000"); // Set user 1 balance to 10000
      await client.set("user:2:balance", "500");

      initialized = true;
      console.log("✅ Redis initialized with default user balances");
    } catch (error) {
      console.error("❌ Redis initialization failed:", error);
    }
  }
}
