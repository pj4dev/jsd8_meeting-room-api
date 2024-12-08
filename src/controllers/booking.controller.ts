import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Booking } from '../models/booking.model';
import * as timeUtil from '../utils/time.util';
import { ValidationError } from '../errors/validation.error';
import { BookingError } from '../errors/booking.error';
import { Member } from '../models/member.model';

export const getBooking = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.aggregate([
            {
                $lookup: {
                    from: 'members',
                    localField: 'member_id',
                    foreignField: '_id',
                    as: 'member_info'
                }
            },
            {
                $unwind: '$member_info'
            },
            {
            $project: {
                _id: 1,
                member_id: 1,
                start_time: 1,
                end_time: 1,
                'member_info.name': 1
            }
            }
        ]);

        const payloadBookings = bookings.map(booking => ({
            meeting_id: booking._id,
            team_member: booking.member_info.name,
            time_slot: booking.start_time,
            duration: timeUtil.convertToDuration(booking.start_time, booking.end_time) + 1
        }));

        res.status(200).json(payloadBookings);
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
};

export const createBooking = async (req: Request, res: Response) => {
    const { manager_id, slot, duration, staff_id } = req.body;
    try {
        // validate manager id in request body
        if (!manager_id || manager_id.trim() === '') {
            throw new ValidationError('manager ID is required');
        }
        // validate slot in request body
        if (!slot || slot.trim() === '') {
            throw new ValidationError('slot is required');
        }

        const slotDate = new Date(slot);
        if (isNaN(slotDate.getTime())) {
            throw new ValidationError('slot is not a valid date format');
        }

        // validate duration in request body
        if (!duration || typeof duration !== 'number') {
            throw new ValidationError('duration is required');
        }

        // validate staff id in request body
        if (!staff_id || staff_id.trim() === '') {
            throw new ValidationError('staff ID is required');
        }

        // validate if member id and manager id are valid
        const member = await Member.findOne({ _id: staff_id, manager_id: manager_id });
        if (!member) {
            throw new ValidationError('staff ID is not valid');
        }

        // validate if slot is available
        const endDateTime = timeUtil.convertToEndDateTime(slotDate, duration);
        const isSlotAvailable = await Booking.findOne({
            start_time: { $lte: timeUtil.subtractOneMinute(endDateTime) },
            end_time: { $gte: slotDate }
        });
        if (isSlotAvailable) {
            throw new BookingError('slot is not available');
        }

        // insert booking
        await Booking.create({
            member_id: staff_id,
            start_time: slotDate,
            end_time: timeUtil.subtractOneMinute(endDateTime)
        });
        
        res.status(200).json({ message: "created" });
    } catch (error) {
        console.log(error);
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else if (error instanceof BookingError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'internal server error' });
        }
    }
};

export const updateBooking = async (req: Request, res: Response) => {
    const meetingId = req.params.meeting_id;
    const { slot, duration } = req.body;

    try {
        // validate slot in request body
        if (!slot || slot.trim() === '') {
            throw new ValidationError('slot is required');
        }

        const slotDate = new Date(slot);
        if (isNaN(slotDate.getTime())) {
            throw new ValidationError('slot is not a valid date format');
        }

        // validate duration in request body
        if (!duration || typeof duration !== 'number') {
            throw new ValidationError('duration is required');
        }

        // validate meeting id in request params
        if (!meetingId || meetingId.trim() === '') {
            throw new ValidationError('meeting ID is required');
        }

        // validate if meeting id is valid
        const booking = await Booking.findOne({ _id: meetingId });
        if (!booking) {
            throw new BookingError('meeting ID is not valid');
        }

        // validate if slot is available
        const endDateTime = timeUtil.convertToEndDateTime(slotDate, duration);
        const isSlotAvailable = await Booking.findOne({
            start_time: { $lte: timeUtil.subtractOneMinute(endDateTime) },
            end_time: { $gte: slotDate }
        });
        if (isSlotAvailable) {
            throw new BookingError('slot is not available');
        }

        // update booking
        await Booking.updateOne(
            { _id: meetingId },
            {
                $set: {
                    start_time: slotDate,
                    end_time: timeUtil.subtractOneMinute(endDateTime)
                }
            }
        );

        
        res.status(200).json({ message: "updated" });
    } catch (error) {
        console.log(error);
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else if (error instanceof BookingError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'internal server error' });
        }
    }
};

export const deleteBooking = async (req: Request, res: Response) => {
    const meetingId = req.params.meeting_id;

    try {

        // validate meeting id in request params
        if (!meetingId || meetingId.trim() === '') {
            throw new ValidationError('meeting ID is required');
        }

        // validate if meeting id is valid
        const booking = await Booking.findOne({ _id: meetingId });
        if (!booking) {
            throw new BookingError('meeting ID is not valid');
        }

        // delete booking
        await Booking.deleteOne({ _id: meetingId });

        res.status(200).json({ message: "deleted" });
    } catch (error) {
        console.log(error);
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else if (error instanceof BookingError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'internal server error' });
        }
    }
};