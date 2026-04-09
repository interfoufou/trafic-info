'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
const createIcon = (type: string) => {
  const icons: Record<string, { emoji: string; color: string }> = {
    traffic_jam: { emoji: '🚗', color: '#f97316' },
    accident: { emoji: '🚨', color: '#ef4444' },
    roadwork: { emoji: '🚧', color: '#eab308' },
    hazard: { emoji: '⚠️', color: '#a855f7' },
    police: { emoji: '🚔', color: '#3b82f6' },
    camera: { emoji: '📷', color: '#06b6d4' },
    closure: { emoji: '⛔', color: '#6b7280' },
    other: { emoji: '📢', color: '#22c55e' },
  };

  const config = icons[type] || icons.other;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${config.color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        border: 3px solid white;
        font-size: 20px;
      ">
        ${config.emoji}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

interface Report {
  id: string;
  type: string;
  title: string;
  description: string | null;
  latitude: number;
  longitude: number;
  location: string;
  status: string;
  votes: number;
  views: number;
  createdAt: string;
}

interface MapProps {
  reports: Report[];
  language: 'ar' | 'fr' | 'en';
  onReportClick?: (report: Report) => void;
}

// Component to fit bounds to markers
function FitBounds({ reports }: { reports: Report[] }) {
  const map = useMap();

  useEffect(() => {
    if (reports.length > 0) {
      const bounds = L.latLngBounds(
        reports.map(r => [r.latitude, r.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [reports, map]);

  return null;
}

const translations = {
  ar: {
    location: 'الموقع',
    votes: 'تصويت',
    views: 'مشاهدة',
    status: 'الحالة',
    active: 'نشط',
    resolved: 'تم الحل',
    mapTitle: 'خريطة الطرقات',
    mapSubtitle: 'تونس',
  },
  fr: {
    location: 'Localisation',
    votes: 'votes',
    views: 'vues',
    status: 'Statut',
    active: 'actif',
    resolved: 'résolu',
    mapTitle: 'Carte Routière',
    mapSubtitle: 'Tunisie',
  },
  en: {
    location: 'Location',
    votes: 'votes',
    views: 'views',
    status: 'Status',
    active: 'active',
    resolved: 'resolved',
    mapTitle: 'Road Map',
    mapSubtitle: 'Tunisia',
  },
};

export default function TrafficMap({ reports, language, onReportClick }: MapProps) {
  const t = translations[language];

  // Tunisia center coordinates
  const tunisiaCenter: [number, number] = [33.8869, 9.5375];

  const markers = useMemo(() => {
    return reports.map((report) => ({
      ...report,
      position: [report.latitude, report.longitude] as [number, number],
    }));
  }, [reports]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return language === 'ar' ? `منذ ${minutes} دقيقة` :
             language === 'fr' ? `Il y a ${minutes} min` : `${minutes}m ago`;
    } else if (hours < 24) {
      return language === 'ar' ? `منذ ${hours} ساعة` :
             language === 'fr' ? `Il y a ${hours}h` : `${hours}h ago`;
    } else {
      return language === 'ar' ? `منذ ${days} يوم` :
             language === 'fr' ? `Il y a ${days}j` : `${days}d ago`;
    }
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* Map Header */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xl">🗺️</span>
          <div>
            <p className="font-bold text-slate-800 text-sm">{t.mapTitle}</p>
            <p className="text-xs text-slate-500">{t.mapSubtitle} 🇹🇳</p>
          </div>
        </div>
      </div>

      <MapContainer
        center={tunisiaCenter}
        zoom={7}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={createIcon(marker.type)}
            eventHandlers={{
              click: () => onReportClick?.(marker),
            }}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                <h3 className="font-bold text-gray-800 mb-2">{marker.title}</h3>
                {marker.description && (
                  <p className="text-sm text-gray-600 mb-2">{marker.description}</p>
                )}
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{marker.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🕐</span>
                    <span>{formatTimeAgo(marker.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                      👍 {marker.votes} {t.votes}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                      👁 {marker.views} {t.views}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {markers.length > 0 && <FitBounds reports={reports} />}
      </MapContainer>
    </div>
  );
}
