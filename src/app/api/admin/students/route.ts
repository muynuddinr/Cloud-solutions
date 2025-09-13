import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const trainingId = searchParams.get('trainingId');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (status && status !== 'all') {
      filter['enrollments.status'] = status;
    }
    if (trainingId) {
      filter['enrollments.trainingId'] = trainingId;
    }
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Get students with pagination
    const students = await Student.find(filter)
      .populate('enrollments.trainingId', 'title category level')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Student.countDocuments(filter);

    // Get statistics
    const enrollmentStats = await Student.aggregate([
      { $unwind: '$enrollments' },
      {
        $group: {
          _id: '$enrollments.status',
          count: { $sum: 1 }
        }
      }
    ]);

    const progressStats = await Student.aggregate([
      { $unwind: '$enrollments' },
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: 1 },
          averageProgress: { $avg: '$enrollments.progress' },
          completedCourses: {
            $sum: {
              $cond: [
                { $eq: ['$enrollments.status', 'completed'] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const categoryStats = await Student.aggregate([
      { $unwind: '$enrollments' },
      {
        $lookup: {
          from: 'trainings',
          localField: 'enrollments.trainingId',
          foreignField: '_id',
          as: 'training'
        }
      },
      { $unwind: '$training' },
      {
        $group: {
          _id: '$training.category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const statistics = {
      total: total,
      enrolled: enrollmentStats.find(s => s._id === 'enrolled')?.count || 0,
      inProgress: enrollmentStats.find(s => s._id === 'in_progress')?.count || 0,
      completed: enrollmentStats.find(s => s._id === 'completed')?.count || 0,
      dropped: enrollmentStats.find(s => s._id === 'dropped')?.count || 0,
      totalEnrollments: progressStats[0]?.totalEnrollments || 0,
      averageProgress: progressStats[0]?.averageProgress || 0,
      completedCourses: progressStats[0]?.completedCourses || 0,
      categories: categoryStats
    };

    return NextResponse.json({
      success: true,
      data: {
        students,
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
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const student = new Student(body);
    await student.save();

    return NextResponse.json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create student' },
      { status: 500 }
    );
  }
}
