import { NextRequest, NextResponse } from 'next/server';

// Mock data
let mockReports: any[] = [
  {
    id: '1',
    type: 'traffic_jam',
    title: 'إكتظاظ مروري على طريق مدنين',
    description: 'ازدحام شديد بسبب حادث مروري',
    latitude: 33.8869,
    longitude: 10.0993,
    location: 'طريق مدنين - قابس',
    status: 'active',
    priority: 'high',
    images: null,
    videos: null,
    votes: 15,
    views: 120,
    createdAt: new Date().toISOString(),
  }
];

// GET - جلب بلاغ محدد
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const report = mockReports.find(r => r.id === id);

    if (!report) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

// PUT - تحديث بلاغ
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const reportIndex = mockReports.findIndex(r => r.id === id);

    if (reportIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    mockReports[reportIndex] = {
      ...mockReports[reportIndex],
      ...body,
      votes: (mockReports[reportIndex].votes || 0) + (body.votes || 0),
      views: (mockReports[reportIndex].views || 0) + (body.views || 0)
    };

    return NextResponse.json({
      success: true,
      data: mockReports[reportIndex]
    });
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update report' },
      { status: 500 }
    );
  }
}

// DELETE - حذف بلاغ
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reportIndex = mockReports.findIndex(r => r.id === id);

    if (reportIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    mockReports = mockReports.filter(r => r.id !== id);

    return NextResponse.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}
