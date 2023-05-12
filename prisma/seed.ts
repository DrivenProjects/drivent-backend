import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  let users = await prisma.user.createMany({
    data: [
      {
        email: ' user14@gmail.com',
        password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
      {
        email: ' teste@gmail.com',
        password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
      {
        email: ' teste2@gmail.com',
        password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
      {
        email: ' teste3@gmail.com',
        password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
      {
        email: ' teste4@gmail.com',
        password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
    ],
  });

  let hotels = await prisma.hotel.createMany({
    data: [
      {
        name: 'Hilton',
        image: 'https://www.een.com/wp-content/uploads/2020/12/hilton-bldg.jpg',
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
      {
        name: 'Ibis Hotel',
        image: 'https://www.ahstatic.com/photos/a747_ho_00_p_1024x768.jpg',
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
    ],
  });

  let rooms = await prisma.room.createMany({
    data: [
      { name: '101', capacity: 3, hotelId: 1, createdAt: dayjs().toDate(), updatedAt: '2023-05-09T20:02:57.276Z' },
      { name: '102', capacity: 5, hotelId: 2, createdAt: dayjs().toDate(), updatedAt: '2023-05-09T20:02:57.276Z' },
      { name: '103', capacity: 2, hotelId: 2, createdAt: dayjs().toDate(), updatedAt: '2023-05-09T20:02:57.276Z' },
      { name: '301', capacity: 2, hotelId: 2, createdAt: dayjs().toDate(), updatedAt: '2023-05-09T20:02:57.276Z' },
      { name: '302', capacity: 3, hotelId: 2, createdAt: dayjs().toDate(), updatedAt: '2023-05-09T20:02:57.276Z' },
      { name: '303', capacity: 4, hotelId: 2, createdAt: dayjs().toDate(), updatedAt: '2023-05-09T20:02:57.276Z' },
    ],
  });

  let bookings = await prisma.booking.createMany({
    data: [
      {
        userId: 1,
        roomId: 2,
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
      {
        userId: 2,
        roomId: 2,
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
      {
        userId: 3,
        roomId: 1,
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
      {
        userId: 5,
        roomId: 4,
        createdAt: dayjs().toDate(),
        updatedAt: '2023-05-09T20:02:57.276Z',
      },
    ],
  });

  console.log({ event });
  console.log({ users });
  console.log({ hotels });
  console.log({ rooms });
  console.log({ bookings });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
