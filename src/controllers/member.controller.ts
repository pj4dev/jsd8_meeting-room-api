import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Member } from '../models/member.model';
import { ValidationError } from '../errors/validation.error';

export const listMember = async (req: Request, res: Response) => {
    const managerId = req.params.manager_id;

    try {
        const members  = await Member.find({ manager_id: managerId });
        res.status(200).json(members);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createMember = async (req: Request, res: Response) => {
    const managerId = req.params.manager_id;
    const { name, position } = req.body;

    try {
        // validate name in request body
        if (!name || name.trim() === '') {
            throw new ValidationError('name cannot be empty');
        }
        // validate position in request body
        if (!position || position.trim() === '') {
            throw new ValidationError('position cannot be empty');
        }

        const member = { _id: new ObjectId(), name: name, position: position, manager_id: managerId, created_at: new Date() };
        await Member.create(member);
        res.status(201).json({ message: 'created'});
    } catch (error) {
        console.log(error);
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'internal server error' });
        }
    }
}