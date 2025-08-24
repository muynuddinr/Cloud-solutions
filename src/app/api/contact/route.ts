import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

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
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Create new contact entry
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      subject: subject?.trim() || '',
      message: message.trim()
    });

    // Save to database
    await contact.save();

    // Return success response
    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        id: contact._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    
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
        { error: 'An error occurred while saving your message.' },
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
    const includeMessage = searchParams.get('includeMessage') === 'true';
    
    let selectFields = 'name email subject createdAt';
    if (includeMessage) {
      selectFields = 'name email phone subject message createdAt';
    }
    
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .select(selectFields)
      .limit(50);

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
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
        { error: 'Contact ID is required' },
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
    
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Contact deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
