import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  education: {
    level: string;
    field?: string;
    institution?: string;
  };
  experience: {
    years: number;
    description?: string;
  };
  enrollments: {
    trainingId: mongoose.Types.ObjectId;
    enrollmentDate: Date;
    status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
    progress: number; // percentage
    completionDate?: Date;
    certificateIssued: boolean;
    certificateUrl?: string;
  }[];
  preferences: {
    categories: string[];
    levels: string[];
    timeSlots: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot be more than 20 characters']
  },
  address: {
    street: {
      type: String,
      trim: true,
      maxlength: [200, 'Street address cannot be more than 200 characters']
    },
    city: {
      type: String,
      trim: true,
      maxlength: [50, 'City cannot be more than 50 characters']
    },
    state: {
      type: String,
      trim: true,
      maxlength: [50, 'State cannot be more than 50 characters']
    },
    zipCode: {
      type: String,
      trim: true,
      maxlength: [10, 'Zip code cannot be more than 10 characters']
    },
    country: {
      type: String,
      trim: true,
      maxlength: [50, 'Country cannot be more than 50 characters']
    }
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  education: {
    level: {
      type: String,
      required: [true, 'Education level is required'],
      trim: true
    },
    field: {
      type: String,
      trim: true
    },
    institution: {
      type: String,
      trim: true
    }
  },
  experience: {
    years: {
      type: Number,
      required: [true, 'Experience years is required'],
      min: [0, 'Experience years cannot be negative']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Experience description cannot be more than 500 characters']
    }
  },
  enrollments: [{
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: 'Training',
      required: true
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['enrolled', 'in_progress', 'completed', 'dropped'],
      default: 'enrolled'
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completionDate: {
      type: Date
    },
    certificateIssued: {
      type: Boolean,
      default: false
    },
    certificateUrl: {
      type: String,
      trim: true
    }
  }],
  preferences: {
    categories: [{
      type: String,
      trim: true
    }],
    levels: [{
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    }],
    timeSlots: [{
      type: String,
      trim: true
    }]
  }
}, {
  timestamps: true
});

// Create indexes for better performance
StudentSchema.index({ email: 1 });
StudentSchema.index({ 'enrollments.trainingId': 1 });
StudentSchema.index({ 'enrollments.status': 1 });
StudentSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

// Prevent mongoose from creating the model multiple times
export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
