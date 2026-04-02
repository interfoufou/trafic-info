'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText,
  Car,
  AlertTriangle,
  Shield,
  CreditCard,
  HelpCircle,
  ChevronLeft,
  ExternalLink,
  Download,
  Info,
  Camera,
  Construction
} from 'lucide-react';

const services = [
  {
    id: 'license',
    title: 'رخصة السياقة',
    titleFr: 'Permis de conduire',
    titleEn: 'Driving License',
    icon: Car,
    color: 'bg-blue-500',
    description: 'معلومات حول الحصول على رخصة السياقة وتجديدها',
    items: [
      'الحصول على رخصة السياقة لأول مرة',
      'تجديد رخصة السياقة',
      'استبدال رخصة السياقة',
      'رخصة السياقة الدولية',
    ],
  },
  {
    id: 'roadwork',
    title: 'تراخيص الأشغال بالطريق',
    titleFr: 'Autorisations de travaux',
    titleEn: 'Road Work Permits',
    icon: Construction,
    color: 'bg-green-500',
    description: 'إجراءات الحصول على تراخيص الأشغال بالطريق العام',
    items: [
      'طلب ترخيص أشغال',
      'شروط ومستندات الترخيص',
      'مدة صلاحية الترخيص',
      'تجديد الترخيص',
    ],
  },
  {
    id: 'radar',
    title: 'الرادار الآلي',
    titleFr: 'Radar automatique',
    titleEn: 'Speed Camera',
    icon: Camera,
    emoji: '📷',
    color: 'bg-indigo-500',
    description: 'معلومات حول الرادارات الآلية والسرعات المحددة',
    items: [
      'مواقع الرادارات الآلية',
      'السرعات المحددة',
      'مخالفات السرعة',
      'الطعن في المخالفات',
    ],
  },
  {
    id: 'violations',
    title: 'المخالفات المرورية',
    titleFr: 'Infractions routières',
    titleEn: 'Traffic Violations',
    icon: AlertTriangle,
    color: 'bg-orange-500',
    description: 'الاستعلام عن المخالفات ودفع الغرامات',
    items: [
      'الاستعلام عن المخالفات',
      'دفع الغرامات',
      'الطعن في المخالفات',
      'جدول المخالفات والغرامات',
    ],
  },
  {
    id: 'accident',
    title: 'الحوادث المرورية',
    titleFr: 'Accidents de la route',
    titleEn: 'Traffic Accidents',
    icon: Shield,
    color: 'bg-red-500',
    description: 'إجراءات الإبلاغ عن الحوادث',
    items: [
      'الإبلاغ عن حادث',
      'محضر الحادث',
      'شهادة الحادث',
      'إجراءات التأمين',
    ],
  },
  {
    id: 'payments',
    title: 'الخدمات الإلكترونية',
    titleFr: 'Services en ligne',
    titleEn: 'E-Services',
    icon: CreditCard,
    color: 'bg-purple-500',
    description: 'خدمات إلكترونية متاحة عبر الإنترنت',
    items: [
      'الدفع الإلكتروني',
      'حجز موعد',
      'تتبع الملف',
      'خدمات أخرى',
    ],
  },
  {
    id: 'faq',
    title: 'الأسئلة المتداولة',
    titleFr: 'FAQ',
    titleEn: 'FAQ',
    icon: HelpCircle,
    color: 'bg-cyan-500',
    description: 'إجابات على الأسئلة المتكررة',
    items: [
      'كيفية الحصول على رخصة السياقة؟',
      'ما هي وثائق ترخيص الأشغال؟',
      'كيف أدفع مخالفة مرورية؟',
      'أسئلة أخرى متداولة',
    ],
  },
];

export function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="bg-gradient-to-l from-purple-600 to-purple-700 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">خدمات إدارة شرطة المرور</h2>
              <p className="text-purple-100 text-sm">جميع الخدمات في متناول يدك</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`overflow-hidden transition-all cursor-pointer ${
              expandedService === service.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setExpandedService(
              expandedService === service.id ? null : service.id
            )}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center text-white text-lg`}>
                    {service.emoji ? (
                      <span>{service.emoji}</span>
                    ) : (
                      <service.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <span>{service.title}</span>
                    <p className="text-xs text-muted-foreground font-normal">{service.titleFr}</p>
                  </div>
                </div>
                <ChevronLeft
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    expandedService === service.id ? '-rotate-90' : ''
                  }`}
                />
              </CardTitle>
            </CardHeader>
            
            {expandedService === service.id && (
              <CardContent className="pt-0 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.items.map((item, index) => (
                    <button
                      key={index}
                      className="w-full p-2 rounded-lg bg-muted/50 hover:bg-muted text-right text-sm flex items-center justify-between group"
                    >
                      <span>{item}</span>
                      <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            روابط مفيدة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-between">
            <span>وزارة الداخلية</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>بوابة الحكومة الإلكترونية</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>المنظمة الوطنية للسلامة المرورية</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Download Section */}
      <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Download className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">تحميل نماذج الوثائق</h4>
              <p className="text-sm text-muted-foreground">نماذج جاهزة للطباعة</p>
            </div>
            <Button variant="outline" size="sm">
              تحميل
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">ملاحظة</h4>
            <p className="text-xs text-muted-foreground mt-1">
              للاستفسارات والأسئلة، يُرجى التواصل مع إدارة شرطة المرور على الأرقام المذكورة في قسم التواصل
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
