import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TrainingEnquiry from '@/models/TrainingEnquiry';

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
    const { name, phone, email, address, trainingPrograms, preferredFormat, notes } = body;

    // Validate required fields
    if (!name || !phone || !email || !trainingPrograms || !preferredFormat) {
      return NextResponse.json(
        { error: 'Name, phone, email, training programs, and preferred format are required' },
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

    // Validate training programs is an array
    if (!Array.isArray(trainingPrograms)) {
      return NextResponse.json(
        { error: 'Training programs must be an array' },
        { status: 400 }
      );
    }

    // Validate at least one training program is selected
    if (trainingPrograms.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one training program' },
        { status: 400 }
      );
    }

    // Validate training programs
    const validPrograms = ['laptop', 'pc', 'printer', 'gadget', 'corporate'];
    const invalidPrograms = trainingPrograms.filter(program => !validPrograms.includes(program));
    if (invalidPrograms.length > 0) {
      return NextResponse.json(
        { error: `Invalid training program selection: ${invalidPrograms.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate preferred format
    const validFormats = ['inPerson', 'online', 'onSite'];
    if (!validFormats.includes(preferredFormat)) {
      return NextResponse.json(
        { error: 'Invalid preferred format' },
        { status: 400 }
      );
    }

    // Create new training enquiry entry
    const trainingEnquiry = new TrainingEnquiry({
      contactInfo: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        address: address?.trim() || ''
      },
      trainingPrograms,
      preferredFormat,
      notes: notes?.trim() || ''
    });

    // Save to database
    await trainingEnquiry.save();

    // Return success response
    return NextResponse.json(
      { 
        message: 'Training enquiry submitted successfully',
        id: trainingEnquiry._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Training enquiry submission error:', error);
    
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
        { error: 'An error occurred while saving your enquiry.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = await dbConnect();
    
    // If no database connection, return error
    if (!db) {
      return NextResponse.json(
        { error: 'Database not available. Please check your configuration.' },
        { status: 503 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const format = searchParams.get('format');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (format) query.preferredFormat = format;
    
    const trainingEnquiries = await TrainingEnquiry.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('contactInfo trainingPrograms preferredFormat status notes scheduledDate createdAt updatedAt');

    return NextResponse.json({ trainingEnquiries });
  } catch (error) {
    console.error('Error fetching training enquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training enquiries' },
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
        { error: 'Training enquiry ID is required' },
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
    
    const deletedEnquiry = await TrainingEnquiry.findByIdAndDelete(id);
    
    if (!deletedEnquiry) {
      return NextResponse.json(
        { error: 'Training enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Training enquiry deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting training enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to delete training enquiry' },
      { status: 500 }
    );
  }
}
