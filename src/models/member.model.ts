import { Schema, model, Document } from 'mongoose';

interface IMember extends Document {
    name: string;
    position: string;
    manager_id: number;
    created_at: Date;
}

const memberSchema = new Schema<IMember>({
    name: { type: String, required: true },
    position: { type: String, required: true },
    manager_id: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

export const Member = model<IMember>('Member', memberSchema);