import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    const db = await dbConnect();
    
    // If no database connection, return error
    if (!db) {
      return NextResponse.json(
        { error: 'Database not available. Please check your configuration.' },
        { status: 503 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email: email.trim().toLowerCase() });
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Reactivate subscription
        existingSubscriber.status = 'active';
        await existingSubscriber.save();
        
        return NextResponse.json(
          { 
            message: 'Welcome back! Your subscription has been reactivated.',
            id: existingSubscriber._id 
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 409 }
        );
      }
    }

    // Create new newsletter subscription
    const newsletter = new Newsletter({
      email: email.trim().toLowerCase(),
      status: 'active'
    });

    // Save to database
    await newsletter.save();

    // Return success response
    return NextResponse.json(
      { 
        message: 'Successfully subscribed to our newsletter!',
        id: newsletter._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Handle mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error. Please check your input.' },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error instanceof Error && error.name === 'MongoError') {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await dbConnect();
    
    // If no database connection, return error
    if (!db) {
      return NextResponse.json(
        { error: 'Database not available. Please check your configuration.' },
        { status: 503 }
      );
    }
    
    const subscribers = await Newsletter.find({})
      .sort({ subscribedAt: -1 })
      .select('email status subscribedAt')
      .limit(100);

    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      );
    }

    const db = await dbConnect();
    
    // If no database connection, return error
    if (!db) {
      return NextResponse.json(
        { error: 'Database not available. Please check your configuration.' },
        { status: 503 }
      );
    }
    
    const deletedSubscriber = await Newsletter.findByIdAndDelete(id);
    
    if (!deletedSubscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Subscriber removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing subscriber:', error);
    return NextResponse.json(
      { error: 'Failed to remove subscriber' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    const { status } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      );
    }

    if (!status || !['active', 'pending', 'unsubscribed'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required' },
        { status: 400 }
      );
    }

    const db = await dbConnect();
    
    // If no database connection, return error
    if (!db) {
      return NextResponse.json(
        { error: 'Database not available. Please check your configuration.' },
        { status: 503 }
      );
    }
    
    const updatedSubscriber = await Newsletter.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    if (!updatedSubscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Subscriber status updated successfully',
        subscriber: updatedSubscriber
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating subscriber status:', error);
    return NextResponse.json(
      { error: 'Failed to update subscriber status' },
      { status: 500 }
    );
  }
}
