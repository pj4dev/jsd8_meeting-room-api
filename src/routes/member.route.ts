import { Router } from 'express';
import * as controller from '../controllers/member.controller';

export const member = Router();

member.get('/:manager_id', controller.listMember);
member.post('/:manager_id', controller.createMember);

