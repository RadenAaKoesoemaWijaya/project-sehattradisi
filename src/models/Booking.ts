import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  userId: string;
  serviceId: string;
  providerId?: string;
  date: Date;
  time?: string;
  status: string;
  price: number;
  paymentMethod: string;
  paymentStatus: string;
  address: string;
  notes?: string;
  qrisCode?: string;
}

const BookingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  providerId: { type: Schema.Types.ObjectId, ref: 'Provider' },
  date: { type: Date, required: true },
  time: String,
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  price: { type: Number, required: true },
  paymentMethod: { 
    type: String,
    enum: ['bank_transfer', 'e_wallet', 'cash', 'qris'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  address: { type: String, required: true },
  notes: String,
  qrisCode: String
}, {
  timestamps: true
});

export default mongoose.model<IBooking>('Booking', BookingSchema);