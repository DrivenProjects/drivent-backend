import { prisma } from '@/config';


export async function createActivity(activityId: number, name: string, capacity: number) {
  const activity = await prisma.activity.create({
    data: {
      id: activityId,
      name: name,
      capacity,
      location: 'Example Location',
      startDateTime: new Date(),
      endDateTime: new Date(),
    },
  });

  await prisma.activityType.create({
    data: {
      userId: 1,
      activityId: activity.id,
    },
  });

  return activity;
}

export function createEnrollment(id: number, userId: number, activityId: number) {
  return { id, userId, activityId };
}







