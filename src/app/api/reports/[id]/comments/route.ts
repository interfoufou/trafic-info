import { NextRequest, NextResponse } from 'next/server';

// Mock comments
const mockComments = [
  {
    id: '1',
    content: 'تم حل المشكلة',
    userName: 'أحمد',
    createdAt: new Date().toISOString()
  }
];

// GET - جلب تعليقات بلاغ
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    return NextResponse.json({
      success: true,
      data: mockComments
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST - إضافة تعليق جديد
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { content, userName } = body;

    const newComment = {
      id: Date.now().toString(),
      content: content || '',
      userName: userName || 'مجهول',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newComment,
      message: 'Comment added successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
