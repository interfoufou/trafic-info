'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Newspaper,
  AlertTriangle,
  Info,
  Clock
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

interface NewsSectionProps {
  language: 'ar' | 'fr' | 'en';
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'تنبيه: إغلاق شارع الحبيب بورقيبة للصيانة',
    content: 'يتم إغلاق شارع الحبيب بورقيبة من جانب محطة المترو إلى جانب السفارة الفرنسية لأعمال صيانة من الساعة 22:00 إلى 06:00',
    category: 'urgent',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'حركة مرور كثيفة على الطريق السيار تونس-صفاقس',
    content: 'تنبه شرطة المرور من حركة مرور كثيفة على الطريق السيار تونس-صفاقس بسبب عطلة نهاية الأسبوع',
    category: 'warning',
    createdAt: new Date(Date.now() - 3600000),
  },
];

export default function NewsSection({ language }: NewsSectionProps) {
  const t = {
    ar: {
      title: 'الأخبار المرورية',
      subtitle: 'آخر الأخبار والتحذيرات',
      urgent: 'عاجل',
      warning: 'تحذير',
      info: 'معلومات',
      readMore: 'اقرأ المزيد',
    },
    fr: {
      title: 'Actualités routières',
      subtitle: 'Dernières nouvelles et avertissements',
      urgent: 'Urgent',
      warning: 'Avertissement',
      info: 'Information',
      readMore: 'Lire plus',
    },
    en: {
      title: 'Traffic News',
      subtitle: 'Latest news and warnings',
      urgent: 'Urgent',
      warning: 'Warning',
      info: 'Information',
      readMore: 'Read more',
    },
  }[language];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return language === 'ar' ? `منذ ${minutes} دقيقة` : 
             language === 'fr' ? `Il y a ${minutes} min` : `${minutes}m ago`;
    }
    return language === 'ar' ? `منذ ${hours} ساعة` :
           language === 'fr' ? `Il y a ${hours}h` : `${hours}h ago`;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-l from-amber-600 to-orange-600 text-white border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
              <p className="text-orange-100 text-sm">{t.subtitle}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Newspaper className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockNews.map((news) => (
          <Card key={news.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  news.category === 'urgent' ? 'bg-red-100' :
                  news.category === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {news.category === 'urgent' ? (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  ) : news.category === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <Info className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{news.title}</h3>
                    <Badge variant="outline" className={getCategoryColor(news.category)}>
                      {news.category === 'urgent' ? t.urgent : 
                       news.category === 'warning' ? t.warning : t.info}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{news.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(news.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
