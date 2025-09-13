import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Training from '@/models/Training';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const training = await Training.findById(id);
    
    if (!training) {
      return NextResponse.json(
        { success: false, message: 'Training course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: training
    });
  } catch (error) {
    console.error('Error fetching training course:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch training course' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const body = await request.json();
    const training = await Training.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!training) {
      return NextResponse.json(
        { success: false, message: 'Training course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Training course updated successfully',
      data: training
    });
  } catch (error) {
    console.error('Error updating training course:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update training course' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const training = await Training.findByIdAndDelete(id);
    
    if (!training) {
      return NextResponse.json(
        { success: false, message: 'Training course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Training course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting training course:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete training course' },
      { status: 500 }
    );
  }
}
