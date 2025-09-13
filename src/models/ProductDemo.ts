import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDemo extends Document {
  customerType: 'new' | 'existing';
  contactDetails: {
    name: string;
    phone: string;
    email: string;
    company?: string;
    location?: string;
  };
  interestedIn: string[]; // Array of product IDs (EMS, SMA, MMA, QMS)
  requestType: 'productDemo' | 'enquiryPricing';
  notes?: string;
  status: 'pending' | 'contacted' | 'demo_scheduled' | 'completed' | 'cancelled';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductDemoSchema: Schema = new Schema({
  customerType: {
    type: String,
    required: [true, 'Customer type is required'],
    enum: ['new', 'existing'],
    default: 'new'
  },
  contactDetails: {
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
    company: {
      type: String,
      trim: true,
      maxlength: [200, 'Company name cannot be more than 200 characters']
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot be more than 200 characters']
    }
  },
  interestedIn: [{
    type: String,
    required: true,
    enum: ['EMS', 'SMA', 'MMA', 'QMS'],
    uppercase: true
  }],
  requestType: {
    type: String,
    required: [true, 'Request type is required'],
    enum: ['productDemo', 'enquiryPricing'],
    default: 'productDemo'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'demo_scheduled', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedTo: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create indexes for better performance
ProductDemoSchema.index({ 'contactDetails.email': 1 });
ProductDemoSchema.index({ customerType: 1 });
ProductDemoSchema.index({ status: 1 });
ProductDemoSchema.index({ createdAt: -1 });
ProductDemoSchema.index({ interestedIn: 1 });

// Prevent mongoose from creating the model multiple times
export default mongoose.models.ProductDemo || mongoose.model<IProductDemo>('ProductDemo', ProductDemoSchema);
