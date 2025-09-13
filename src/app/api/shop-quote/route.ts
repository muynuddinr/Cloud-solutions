import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ShopQuote from '@/models/ShopQuote';

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
    const { name, email, phone, pcTypes, usageTypes } = body;

    // Validate required fields
    if (!name || !email || !phone || !pcTypes || !usageTypes) {
      return NextResponse.json(
        { error: 'Name, email, phone, PC types, and usage types are required' },
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

    // Validate PC types and usage types are arrays
    if (!Array.isArray(pcTypes) || !Array.isArray(usageTypes)) {
      return NextResponse.json(
        { error: 'PC types and usage types must be arrays' },
        { status: 400 }
      );
    }

    // Validate at least one PC type and usage type is selected
    if (pcTypes.length === 0 || usageTypes.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one PC type and one usage type' },
        { status: 400 }
      );
    }

    // Validate PC types
    const validPcTypes = ['desktop', 'laptop', 'gaming', 'workstation', 'allInOne', 'mini', 'server'];
    const invalidPcTypes = pcTypes.filter(type => !validPcTypes.includes(type));
    if (invalidPcTypes.length > 0) {
      return NextResponse.json(
        { error: `Invalid PC type selection: ${invalidPcTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate usage types
    const validUsageTypes = ['basic', 'business', 'education', 'creative', 'gamingCasual', 'gamingMid', 'gamingHigh', 'professional', 'serverEnterprise', 'travel'];
    const invalidUsageTypes = usageTypes.filter(type => !validUsageTypes.includes(type));
    if (invalidUsageTypes.length > 0) {
      return NextResponse.json(
        { error: `Invalid usage type selection: ${invalidUsageTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Create new shop quote entry
    const shopQuote = new ShopQuote({
      contactInfo: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim()
      },
      pcTypes,
      usageTypes
    });

    // Save to database
    await shopQuote.save();

    // Return success response
    return NextResponse.json(
      { 
        message: 'Quote request submitted successfully',
        id: shopQuote._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Shop quote submission error:', error);
    
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
        { error: 'An error occurred while saving your request.' },
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
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    
    const shopQuotes = await ShopQuote.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('contactInfo pcTypes usageTypes status quoteAmount notes createdAt updatedAt');

    return NextResponse.json({ shopQuotes });
  } catch (error) {
    console.error('Error fetching shop quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote requests' },
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
        { error: 'Quote ID is required' },
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
    
    const deletedQuote = await ShopQuote.findByIdAndDelete(id);
    
    if (!deletedQuote) {
      return NextResponse.json(
        { error: 'Quote request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Quote request deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting shop quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote request' },
      { status: 500 }
    );
  }
}
