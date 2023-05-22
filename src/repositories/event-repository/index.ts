import { prisma } from '@/config';
import { redis } from '@/config/redis';


async function findFirst() {
  const cacheKey = 'event';
  const cachedEvent = await redis.get(cacheKey);

 if (cachedEvent) {
   console.log('cache')
   return JSON.parse(cachedEvent);

  }

  const response = await prisma.event.findFirst();
  await redis.set(cacheKey, JSON.stringify(response));

  return response
}

const eventRepository = {
  findFirst,
};

export default eventRepository;