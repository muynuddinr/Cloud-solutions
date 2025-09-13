import mongoose, { Schema, Document } from 'mongoose';

export interface IRepair extends Document {
  customerType: 'new' | 'existing';
  customerDetails: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  deviceDetails: {
    deviceType: string;
    brandModel: string;
    serialNumber?: string;
  };
  issues: string[];
  otherIssue?: string;
  preferredService: 'bringToCenter' | 'requestHomeService';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const RepairSchema: Schema = new Schema({
  customerType: {
    type: String,
    required: [true, 'Customer type is required'],
    enum: ['new', 'existing']
  },
  customerDetails: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
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
  deviceDetails: {
    deviceType: {
      type: String,
      required: [true, 'Device type is required'],
      trim: true
    },
    brandModel: {
      type: String,
      required: [true, 'Brand and model is required'],
      trim: true,
      maxlength: [200, 'Brand and model cannot be more than 200 characters']
    },
    serialNumber: {
      type: String,
      trim: true,
      maxlength: [100, 'Serial number cannot be more than 100 characters']
    }
  },
  issues: [{
    type: String,
    required: true
  }],
  otherIssue: {
    type: String,
    trim: true,
    maxlength: [1000, 'Other issue description cannot be more than 1000 characters']
  },
  preferredService: {
    type: String,
    required: [true, 'Preferred service is required'],
    enum: ['bringToCenter', 'requestHomeService']
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'in_progress', 'completed', 'cancelled']
  }
}, {
  timestamps: true
});

// Prevent mongoose from creating the model multiple times
export default mongoose.models.Repair || mongoose.model<IRepair>('Repair', RepairSchema);
