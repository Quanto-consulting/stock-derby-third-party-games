import { getRedisClient } from "./redis";

// Get user balance
export async function getBalance(userId: string): Promise<number | null> {
  const client = await getRedisClient();
  const balance = await client.get(`user:${userId}:balance`);
  return balance ? parseInt(balance) : null;
}

// Set balance (absolute value)
export async function setBalance(
  userId: string,
  amount: number
): Promise<void> {
  const client = await getRedisClient();
  await client.set(`user:${userId}:balance`, amount.toString());
}

// Update balance (increment/decrement)
export async function updateBalance(
  userId: string,
  change: number
): Promise<number> {
  const client = await getRedisClient();
  return await client.incrBy(`user:${userId}:balance`, change);
}
