import { Router } from 'express';
import * as controller from '../controllers/booking.controller';

export const booking = Router();

booking.get('/', controller.getBooking);
booking.post('/', controller.createBooking);
booking.put('/:meeting_id', controller.updateBooking);
booking.delete('/:meeting_id', controller.deleteBooking);