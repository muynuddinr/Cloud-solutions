import mongoose, { Schema, Document } from 'mongoose';

export interface ITrainingEnquiry extends Document {
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    address?: string;
  };
  trainingPrograms: string[]; // Array of selected training programs
  preferredFormat: 'inPerson' | 'online' | 'onSite';
  notes?: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  assignedTo?: string;
  scheduledDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TrainingEnquirySchema: Schema = new Schema({
  contactInfo: {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone number cannot be more than 20 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    address: {
      type: String,
      trim: true,
      maxlength: [500, 'Address cannot be more than 500 characters']
    }
  },
  trainingPrograms: [{
    type: String,
    required: true,
    enum: ['laptop', 'pc', 'printer', 'gadget', 'corporate']
  }],
  preferredFormat: {
    type: String,
    required: [true, 'Preferred format is required'],
    enum: ['inPerson', 'online', 'onSite'],
    default: 'inPerson'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'scheduled', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  scheduledDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Create indexes for better performance
TrainingEnquirySchema.index({ 'contactInfo.email': 1 });
TrainingEnquirySchema.index({ status: 1 });
TrainingEnquirySchema.index({ createdAt: -1 });
TrainingEnquirySchema.index({ trainingPrograms: 1 });
TrainingEnquirySchema.index({ preferredFormat: 1 });

// Prevent mongoose from creating the model multiple times
export default mongoose.models.TrainingEnquiry || mongoose.model<ITrainingEnquiry>('TrainingEnquiry', TrainingEnquirySchema);
