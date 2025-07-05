import mongoose, { Schema, Document } from 'mongoose';

export interface IProvider extends Document {
  name: string;
  specialties: ('massage' | 'spa' | 'herbal')[];
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  experience: number;
  availableServices: string[];
  location: string;
  schedule: {
    day: string;
    slots: string[];
  }[];
  isActive: boolean;
}

const ProviderSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialties: [{ 
    type: String,
    enum: ['massage', 'spa', 'herbal']
  }],
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  experience: { type: Number, required: true },
  availableServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  location: { type: String, required: true },
  schedule: [{
    day: String,
    slots: [String]
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IProvider>('Provider', ProviderSchema);