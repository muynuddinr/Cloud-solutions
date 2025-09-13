import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ProductDemo from '@/models/ProductDemo';

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
    const { customerType, contactDetails, interestedIn, requestType, notes } = body;

    // Validate required fields
    if (!customerType || !contactDetails || !interestedIn || !requestType) {
      return NextResponse.json(
        { error: 'Customer type, contact details, interested products, and request type are required' },
        { status: 400 }
      );
    }

    // Validate contact details
    const { name, phone, email } = contactDetails;
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required' },
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

    // Validate interested products
    if (!Array.isArray(interestedIn) || interestedIn.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one product of interest' },
        { status: 400 }
      );
    }

    // Validate product codes
    const validProducts = ['EMS', 'SMA', 'MMA', 'QMS'];
    const invalidProducts = interestedIn.filter(product => !validProducts.includes(product));
    if (invalidProducts.length > 0) {
      return NextResponse.json(
        { error: `Invalid product selection: ${invalidProducts.join(', ')}` },
        { status: 400 }
      );
    }

    // Create new product demo entry
    const productDemo = new ProductDemo({
      customerType,
      contactDetails: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        company: contactDetails.company?.trim() || '',
        location: contactDetails.location?.trim() || ''
      },
      interestedIn: interestedIn.map(product => product.toUpperCase()),
      requestType,
      notes: notes?.trim() || ''
    });

    // Save to database
    await productDemo.save();

    // Return success response
    return NextResponse.json(
      { 
        message: 'Product demo request submitted successfully',
        id: productDemo._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Product demo submission error:', error);
    
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
    const customerType = searchParams.get('customerType');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Build query
    const query: any = {};
    if (customerType) query.customerType = customerType;
    if (status) query.status = status;
    
    const productDemos = await ProductDemo.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('customerType contactDetails interestedIn requestType status notes createdAt updatedAt');

    return NextResponse.json({ productDemos });
  } catch (error) {
    console.error('Error fetching product demos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product demo requests' },
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
        { error: 'Product demo ID is required' },
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
    
    const deletedDemo = await ProductDemo.findByIdAndDelete(id);
    
    if (!deletedDemo) {
      return NextResponse.json(
        { error: 'Product demo request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product demo request deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product demo:', error);
    return NextResponse.json(
      { error: 'Failed to delete product demo request' },
      { status: 500 }
    );
  }
}
