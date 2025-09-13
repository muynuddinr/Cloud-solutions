import mongoose, { Schema, Document } from 'mongoose';

export interface ITraining extends Document {
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  duration: number; // in weeks
  price: number;
  instructor: {
    name: string;
    email: string;
    bio?: string;
    image?: string;
  };
  schedule: {
    startDate: Date;
    endDate: Date;
    days: string[]; // ['Monday', 'Wednesday', 'Friday']
    time: string; // '10:00 AM - 12:00 PM'
  };
  maxStudents: number;
  currentStudents: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  curriculum: {
    week: number;
    title: string;
    topics: string[];
    duration: number; // in hours
  }[];
  materials: {
    type: 'video' | 'document' | 'link' | 'quiz';
    title: string;
    url: string;
    description?: string;
  }[];
  images: string[];
  tags: string[];
  isOnline: boolean;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TrainingSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Training title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Training description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 week']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  instructor: {
    name: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Instructor email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    image: {
      type: String,
      trim: true
    }
  },
  schedule: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    time: {
      type: String,
      required: [true, 'Time is required'],
      trim: true
    }
  },
  maxStudents: {
    type: Number,
    required: [true, 'Maximum students is required'],
    min: [1, 'Maximum students must be at least 1']
  },
  currentStudents: {
    type: Number,
    default: 0,
    min: [0, 'Current students cannot be negative']
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  prerequisites: [{
    type: String,
    trim: true
  }],
  learningOutcomes: [{
    type: String,
    trim: true
  }],
  curriculum: [{
    week: {
      type: Number,
      required: true,
      min: 1
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    topics: [{
      type: String,
      trim: true
    }],
    duration: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  materials: [{
    type: {
      type: String,
      enum: ['video', 'document', 'link', 'quiz'],
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  images: [{
    type: String,
    required: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isOnline: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create indexes for better performance
TrainingSchema.index({ title: 'text', description: 'text' });
TrainingSchema.index({ category: 1, subcategory: 1 });
TrainingSchema.index({ status: 1 });
TrainingSchema.index({ level: 1 });
TrainingSchema.index({ 'schedule.startDate': 1 });

// Prevent mongoose from creating the model multiple times
export default mongoose.models.Training || mongoose.model<ITraining>('Training', TrainingSchema);
