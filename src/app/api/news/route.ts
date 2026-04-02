import { NextRequest, NextResponse } from 'next/server';

// Mock news data
const mockNews = [
  {
    id: '1',
    title: 'تحديث طريقي جديد',
    content: 'تحديث على حالة الطرق',
    category: 'info',
    createdAt: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let filteredNews = mockNews;
    if (category) {
      filteredNews = mockNews.filter(n => n.category === category);
    }

    return NextResponse.json({
      success: true,
      data: filteredNews
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
