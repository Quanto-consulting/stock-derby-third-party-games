import { createClient, RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  console.log("REDIS_URL is: ", process.env.REDIS_URL);

  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL,
    });
    await client.connect();
  }
  return client;
}
