import { Router, Request, Response } from 'express';
import { member } from './member.route';
import { booking } from './booking.route';

const routes = Router();

// index route
routes.get('/', (req: Request, res: Response) => {
    res.send('Meeting Room by GenMentor_PJ!');
});

// API routes
routes.use('/api/team-members', member);
routes.use('/api/book', booking);

export default routes;