import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Repair from '@/models/Repair';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Get repairs with pagination
    const repairs = await Repair.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Repair.countDocuments(filter);

    // Get statistics
    const stats = await Repair.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statistics = {
      total: total,
      pending: stats.find(s => s._id === 'pending')?.count || 0,
      in_progress: stats.find(s => s._id === 'in_progress')?.count || 0,
      completed: stats.find(s => s._id === 'completed')?.count || 0,
      cancelled: stats.find(s => s._id === 'cancelled')?.count || 0,
    };

    return NextResponse.json({
      success: true,
      data: {
        repairs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        statistics
      }
    });
  } catch (error) {
    console.error('Error fetching repairs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch repairs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const repair = new Repair(body);
    await repair.save();

    return NextResponse.json({
      success: true,
      message: 'Repair request created successfully',
      data: repair
    });
  } catch (error) {
    console.error('Error creating repair:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create repair request' },
      { status: 500 }
    );
  }
}
