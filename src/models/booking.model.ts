import { Schema, model, Document } from 'mongoose';

interface IBooking extends Document {
    member_id: Schema.Types.ObjectId;
    manager_id: number,
    start_time: Date;
    end_time: Date;
    created_at: Date;
    updated_at: Date;
}

const bookingSchema = new Schema<IBooking>({
    member_id: { type: Schema.Types.ObjectId, required: true, ref: 'Member' },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Booking = model<IBooking>('Booking', bookingSchema);