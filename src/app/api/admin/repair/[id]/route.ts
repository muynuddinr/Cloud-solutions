import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Repair from '@/models/Repair';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const repair = await Repair.findById(id);
    
    if (!repair) {
      return NextResponse.json(
        { success: false, message: 'Repair not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: repair
    });
  } catch (error) {
    console.error('Error fetching repair:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch repair' },
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
    const repair = await Repair.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!repair) {
      return NextResponse.json(
        { success: false, message: 'Repair not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Repair updated successfully',
      data: repair
    });
  } catch (error) {
    console.error('Error updating repair:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update repair' },
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
    const repair = await Repair.findByIdAndDelete(id);
    
    if (!repair) {
      return NextResponse.json(
        { success: false, message: 'Repair not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Repair deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting repair:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete repair' },
      { status: 500 }
    );
  }
}
