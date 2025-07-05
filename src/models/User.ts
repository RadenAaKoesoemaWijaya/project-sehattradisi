import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  birthdate: Date;
  favorites: string[];
  viewHistory: {
    serviceId: string;
    timestamp: Date;
  }[];
  bookingHistory: {
    serviceId: string;
    providerId: string;
    date: Date;
    status: string;
    timestamp: Date;
  }[];
  preferences: {
    categories: string[];
    priceRange: {
      min: number;
      max: number;
    };
    locations: string[];
    timePreferences: string[];
  };
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  birthdate: { type: Date },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  viewHistory: [{
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    timestamp: { type: Date, default: Date.now }
  }],
  bookingHistory: [{
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    providerId: { type: Schema.Types.ObjectId, ref: 'Provider' },
    date: Date,
    status: String,
    timestamp: { type: Date, default: Date.now }
  }],
  preferences: {
    categories: [String],
    priceRange: {
      min: Number,
      max: Number
    },
    locations: [String],
    timePreferences: [String]
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);