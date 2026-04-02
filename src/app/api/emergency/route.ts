import { NextRequest, NextResponse } from 'next/server';

// Mock data
const mockEmergencies = [
  {
    id: '1',
    type: 'accident',
    description: 'حادث مروري خفيف',
    location: 'تونس العاصمة',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

// جلب طلبات الطوارئ
export async function GET(request: NextRequest) {
  return NextResponse.json({ success: true, data: mockEmergencies });
}

// إرسال طلب طوارئ جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newEmergency = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    return NextResponse.json({ 
      success: true, 
      data: newEmergency,
      message: 'تم إرسال طلب الطوارئ بنجاح' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'حدث خطأ' },
      { status: 500 }
    );
  }
}
