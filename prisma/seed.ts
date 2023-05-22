// import { PrismaClient } from "@prisma/client";
import { ActivityType, Activity, Prisma, PrismaClient, TicketType } from '@prisma/client';
import dayjs from "dayjs";
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

  let ticketType: TicketType[] | Prisma.BatchPayload = await prisma.ticketType.findMany();

  if (ticketType.length === 0) {
    ticketType = await prisma.ticketType.createMany({
      data: [
        { name: 'Online', price: 10000, isRemote: true, includesHotel: false },
        { name: 'Presencial Sem Hotel', price: 25000, isRemote: false, includesHotel: false },
        { name: 'Presencial Com Hotel', price: 60000, isRemote: false, includesHotel: true },
      ],
    });
  }

  console.log({ event, ticketType });

  // let users = await prisma.user.createMany({
  //   data: [
  //     {
  //       email: ' user14@gmail.com',
  //       password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
  //       createdAt: dayjs().toDate(),
  //       updatedAt: '2023-05-09T20:02:57.276Z',
  //     },
  //     {
  //       email: ' teste@gmail.com',
  //       password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
  //       createdAt: dayjs().toDate(),
  //       updatedAt: '2023-05-09T20:02:57.276Z',
  //     },
  //     {
  //       email: ' teste2@gmail.com',
  //       password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
  //       createdAt: dayjs().toDate(),
  //       updatedAt: '2023-05-09T20:02:57.276Z',
  //     },
  //     {
  //       email: ' teste3@gmail.com',
  //       password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
  //       createdAt: dayjs().toDate(),
  //       updatedAt: '2023-05-09T20:02:57.276Z',
  //     },
  //     {
  //       email: ' teste4@gmail.com',
  //       password: '$2b$12$UB0p4GEYJXTXQ0a.c7SoFunwAZObdaArSjIoJUrAv2SU4ihj9XYa2',
  //       createdAt: dayjs().toDate(),
  //       updatedAt: '2023-05-09T20:02:57.276Z',
  //     },
  //   ],
  // });

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

  let activityType: ActivityType[] | Prisma.BatchPayload = await prisma.activityType.findMany();
  if (activityType.length === 0) {
    activityType = await prisma.activityType.createMany({
      data: [
        {
          name: 'Teste: montando o PC ideal',
          schedules: '12:00-14:00',
          capacity: 20,
          activityDate: 'Terça, 21/03',
          place: 'Auditório Principal',
        },
        {
          name: 'Minecraft: montando o PC ideal',
          schedules: '12:00-14:00',
          capacity: 20,
          activityDate: 'Quarta, 22/03',
          place: 'Auditório Principal',
        },
        {
          name: 'Minecraft: montando o PC ideal',
          schedules: '12:00-14:00',
          capacity: 20,
          activityDate: 'Quinta, 23/03',
          place: 'Auditório Principal',
        },
        {
          name: 'LoL: montando o PC ideal',
          schedules: '10:00-13:00',
          capacity: 15,
          activityDate: 'Terça, 21/03',
          place: 'Auditório Lateral',
        },
        {
          name: 'LoL: montando o PC ideal',
          schedules: '10:00-13:00',
          capacity: 15,
          activityDate: 'Quarta, 22/03',
          place: 'Auditório Lateral',
        },
        {
          name: 'LoL: montando o PC ideal',
          schedules: '10:00-13:00',
          capacity: 15,
          activityDate: 'Quinta, 23/03',
          place: 'Auditório Lateral',
        },
        {
          name: 'Coding Workshop',
          schedules: '18:00-20:00',
          capacity: 0,
          activityDate: 'Terça, 21/03',
          place: 'Sala de Workshop',
        },
        {
          name: 'Coding Workshop',
          schedules: '18:00-20:00',
          capacity: 10,
          activityDate: 'Quarta, 22/03',
          place: 'Sala de Workshop',
        },
        {
          name: 'Coding Workshop',
          schedules: '18:00-20:00',
          capacity: 1,
          activityDate: 'Quinta, 23/03',
          place: 'Sala de Workshop',
        },
        {
          name: 'Palestra de Encerramento',
          schedules: '19:00-21:00',
          capacity: 20,
          activityDate: 'Quinta, 23/03',
          place: 'Sala de Workshop',
        },
      ],
    });
  }

  console.log({ event });
  console.log({ ticketType });
  console.log({ activityType})
  // console.log({ users });
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
