import redis
import os
from redis import Redis
from config.redis import URL, PORT

REDIS_URL = os.getenv('REDIS_URL')
if REDIS_URL is None:
    DATABASE_URL = os.getenv('DATABASE_URL')

async def redis_pool() -> Redis:
    return await redis.asyncio.from_url(
        url=f"redis://{URL}", port=PORT, db=1, encoding="utf-8", decode_responses=True
    )