import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, changeBooking, getAllBookings, listBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', listBooking)
  .get('/all', getAllBookings)
  .post('', bookingRoom)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
