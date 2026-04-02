import { NextRequest, NextResponse } from 'next/server';

// Mock data - بيانات وهمية للعرض
let mockReports = [
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
    comments: []
  },
  {
    id: '2',
    type: 'roadwork',
    title: 'أشغال بالطريق الوطنية رقم 1',
    description: 'أشغال صيانة على الطريق الوطنية رقم 1',
    latitude: 36.8065,
    longitude: 10.1815,
    location: 'الطريق الوطنية رقم 1 - تونس',
    status: 'active',
    priority: 'medium',
    images: null,
    videos: null,
    votes: 8,
    views: 45,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    comments: []
  },
  {
    id: '3',
    type: 'accident',
    title: 'حادث مروري خفيف',
    description: 'حادث تصادم بسيط بدون إصابات',
    latitude: 34.7406,
    longitude: 10.7603,
    location: 'سيدي بوزيد',
    status: 'active',
    priority: 'low',
    images: null,
    videos: null,
    votes: 5,
    views: 30,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    comments: []
  }
];

// GET - جلب جميع البلاغات
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';

    const reports = mockReports.filter(r => r.status === status);

    return NextResponse.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

// POST - إنشاء بلاغ جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, description, latitude, longitude, location, images, videos } = body;

    if (!type || !title || !latitude || !longitude || !location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newReport = {
      id: Date.now().toString(),
      type,
      title,
      description: description || null,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      location,
      images: images || null,
      videos: videos || null,
      status: 'active',
      priority: 'medium',
      votes: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      comments: []
    };

    mockReports.unshift(newReport);

    return NextResponse.json({
      success: true,
      data: newReport,
      message: 'Report created successfully'
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create report' },
      { status: 500 }
    );
  }
}
