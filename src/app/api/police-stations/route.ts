import { NextRequest, NextResponse } from 'next/server';

// Mock police stations data
const mockStations = [
  {
    id: '1',
    name: 'مركز شرطة المرور - تونس',
    address: 'شارع الجمهورية، تونس',
    phone: '71 343 201',
    latitude: 36.8065,
    longitude: 10.1815,
    type: 'traffic',
    isOpen24h: true
  },
  {
    id: '2',
    name: 'مركز شرطة المرور - صفاقس',
    address: 'شارع الحبيب بورقيبة، صفاقس',
    phone: '74 222 333',
    latitude: 34.7406,
    longitude: 10.7603,
    type: 'traffic',
    isOpen24h: false
  }
];

// جلب مراكز الشرطة
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    let stations = [...mockStations];
    
    if (type) {
      stations = stations.filter(s => s.type === type);
    }

    // إضافة المسافة إذا تم تحديد الموقع
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);

      stations = stations.map((station) => ({
        ...station,
        distance: calculateDistance(userLat, userLng, station.latitude, station.longitude),
      })).sort((a, b) => (a.distance as number) - (b.distance as number));
    }

    return NextResponse.json({ success: true, data: stations });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch police stations' },
      { status: 500 }
    );
  }
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
