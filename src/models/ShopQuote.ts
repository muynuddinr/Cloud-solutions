import mongoose, { Schema, Document } from 'mongoose';

export interface IShopQuote extends Document {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  pcTypes: string[]; // Array of selected PC types
  usageTypes: string[]; // Array of selected usage types
  status: 'pending' | 'quoted' | 'followed_up' | 'completed' | 'cancelled';
  assignedTo?: string;
  quoteAmount?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShopQuoteSchema: Schema = new Schema({
  contactInfo: {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone number cannot be more than 20 characters']
    }
  },
  pcTypes: [{
    type: String,
    required: true,
    enum: ['desktop', 'laptop', 'gaming', 'workstation', 'allInOne', 'mini', 'server']
  }],
  usageTypes: [{
    type: String,
    required: true,
    enum: ['basic', 'business', 'education', 'creative', 'gamingCasual', 'gamingMid', 'gamingHigh', 'professional', 'serverEnterprise', 'travel']
  }],
  status: {
    type: String,
    enum: ['pending', 'quoted', 'followed_up', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  quoteAmount: {
    type: Number,
    min: [0, 'Quote amount cannot be negative']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  }
}, {
  timestamps: true
});

// Create indexes for better performance
ShopQuoteSchema.index({ 'contactInfo.email': 1 });
ShopQuoteSchema.index({ status: 1 });
ShopQuoteSchema.index({ createdAt: -1 });
ShopQuoteSchema.index({ pcTypes: 1 });
ShopQuoteSchema.index({ usageTypes: 1 });

// Prevent mongoose from creating the model multiple times
export default mongoose.models.ShopQuote || mongoose.model<IShopQuote>('ShopQuote', ShopQuoteSchema);
