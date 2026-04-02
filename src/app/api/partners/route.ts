import { NextRequest, NextResponse } from 'next/server';

// Mock partners data
const mockPartners = [
  {
    id: '1',
    name: 'الشركة الوطنية للنقل',
    type: 'transport',
    logo: null,
    phone: '71 123 456',
    email: 'contact@snt.tn',
    isVerified: true
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: mockPartners
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}
