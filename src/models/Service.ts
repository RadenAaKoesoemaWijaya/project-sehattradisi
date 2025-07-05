import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  category: 'massage' | 'spa' | 'herbal';
  description: string;
  shortDescription: string;
  price: number;
  duration: number;
  image: string;
  rating: number;
  reviewCount: number;
  benefits: string[];
  isActive: boolean;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['massage', 'spa', 'herbal']
  },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  benefits: [String],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IService>('Service', ServiceSchema);