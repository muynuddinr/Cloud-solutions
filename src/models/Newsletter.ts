import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  status: 'active' | 'pending' | 'unsubscribed';
  subscribedAt: Date;
  updatedAt: Date;
}

const NewsletterSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'unsubscribed'],
    default: 'active'
  }
}, {
  timestamps: { createdAt: 'subscribedAt', updatedAt: 'updatedAt' }
});

// Prevent mongoose from creating the model multiple times
export default mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);
