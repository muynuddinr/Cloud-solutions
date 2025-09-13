import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Training from '@/models/Training';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const level = searchParams.get('level');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (level && level !== 'all') {
      filter.level = level;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'instructor.name': { $regex: search, $options: 'i' } }
      ];
    }

    // Get training courses with pagination
    const courses = await Training.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Training.countDocuments(filter);

    // Get statistics
    const stats = await Training.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const levelStats = await Training.aggregate([
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Training.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalStudents: { $sum: '$currentStudents' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const revenueStats = await Training.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ['$currentStudents', '$price']
            }
          },
          totalStudents: { $sum: '$currentStudents' }
        }
      }
    ]);

    const statistics = {
      total: total,
      active: stats.find(s => s._id === 'active')?.count || 0,
      draft: stats.find(s => s._id === 'draft')?.count || 0,
      completed: stats.find(s => s._id === 'completed')?.count || 0,
      cancelled: stats.find(s => s._id === 'cancelled')?.count || 0,
      beginner: levelStats.find(s => s._id === 'beginner')?.count || 0,
      intermediate: levelStats.find(s => s._id === 'intermediate')?.count || 0,
      advanced: levelStats.find(s => s._id === 'advanced')?.count || 0,
      totalStudents: revenueStats[0]?.totalStudents || 0,
      totalRevenue: revenueStats[0]?.totalRevenue || 0,
      categories: categoryStats
    };

    return NextResponse.json({
      success: true,
      data: {
        courses,
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
    console.error('Error fetching training courses:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch training courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const training = new Training(body);
    await training.save();

    return NextResponse.json({
      success: true,
      message: 'Training course created successfully',
      data: training
    });
  } catch (error) {
    console.error('Error creating training course:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create training course' },
      { status: 500 }
    );
  }
}
