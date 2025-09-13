import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

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
    const { 
      orderId, 
      productId, 
      productName, 
      productImage, 
      quantity, 
      unitPrice, 
      totalPrice, 
      discount, 
      customerInfo, 
      paymentMethod 
    } = body;

    // Validate required fields
    if (!orderId || !productId || !productName || !quantity || !unitPrice || !totalPrice || !customerInfo) {
      return NextResponse.json(
        { error: 'Missing required order information' },
        { status: 400 }
      );
    }

    // Validate customer info
    const { firstName, lastName, email, phone, address, city, state, pincode } = customerInfo;
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !pincode) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    // Check if order already exists
    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return NextResponse.json(
        { error: 'Order with this ID already exists' },
        { status: 409 }
      );
    }

    // Create new order
    const order = new Order({
      orderId,
      productId,
      productName,
      productImage,
      quantity,
      unitPrice,
      totalPrice,
      discount: discount || 0,
      customerInfo,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Pending'
    });

    // Save to database
    await order.save();

    // Return success response
    return NextResponse.json(
      { 
        message: 'Order created successfully',
        orderId: order.orderId,
        id: order._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Order creation error:', error);
    
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
        { error: 'An error occurred while saving your order.' },
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
    const email = searchParams.get('email');
    const orderId = searchParams.get('orderId');
    const includeDetails = searchParams.get('includeDetails') === 'true';
    
    let query = {};
    
    // Filter by email if provided
    if (email) {
      query = { 'customerInfo.email': email.toLowerCase() };
    }
    
    // Filter by order ID if provided
    if (orderId) {
      query = { orderId };
    }
    
    let selectFields = 'orderId productName quantity totalPrice orderStatus orderDate';
    if (includeDetails) {
      selectFields = 'orderId productId productName productImage quantity unitPrice totalPrice discount customerInfo paymentMethod paymentStatus orderStatus orderDate';
    }
    
    const orders = await Order.find(query)
      .sort({ orderDate: -1 })
      .select(selectFields)
      .limit(100);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const body = await request.json();
    const { orderStatus, paymentStatus } = body;
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
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
    
    const updateData: any = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }
    
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId }, 
      updateData, 
      { new: true }
    );
    
    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Order updated successfully',
        order: updatedOrder
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
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
    
    const deletedOrder = await Order.findOneAndDelete({ orderId });
    
    if (!deletedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Order deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
} 