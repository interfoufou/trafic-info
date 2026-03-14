import { NextResponse } from 'next/server';

// بيانات تجريبية للتطبيق
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Seeding is not available in static export mode',
      data: {
        policeStations: 4,
        news: 4,
        reports: 6,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error seeding data' },
      { status: 500 }
    );
  }
}
