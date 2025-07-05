import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userId: string;
  serviceId: string;
  providerId: string;
  rating: number;
  comment: string;
  images?: string[];
}

const ReviewSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  providerId: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
  rating: { 
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: { type: String, required: true },
  images: [String]
}, {
  timestamps: true
});

export default mongoose.model<IReview>('Review', ReviewSchema);