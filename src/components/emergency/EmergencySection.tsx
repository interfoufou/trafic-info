'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  AlertTriangle, 
  Ambulance, 
  Flame, 
  Car,
  MapPin,
  Clock,
  Shield
} from 'lucide-react';

const emergencyNumbers = [
  {
    name: 'شرطة المرور',
    nameFr: 'Police de Circulation',
    number: '197',
    icon: Car,
    color: 'bg-blue-500',
    description: 'للإبلاغ عن الحوادث والإكتظاظ المروري',
  },
  {
    name: 'إدارة شرطة المرور',
    nameFr: 'Administration de Police de Circulation',
    numbers: ['71 343 201', '71 342 875', '71 342 787'],
    icon: Shield,
    color: 'bg-indigo-600',
    description: 'للتواصل المباشر مع الإدارة',
  },
  {
    name: 'الإسعاف',
    nameFr: 'SAMU',
    number: '190',
    icon: Ambulance,
    color: 'bg-green-500',
    description: 'للحالات الطبية الطارئة',
  },
  {
    name: 'الحماية المدنية',
    nameFr: 'Protection Civile',
    number: '198',
    icon: Flame,
    color: 'bg-orange-500',
    description: 'للحالات الطارئة والحرائق',
  },
];

export function EmergencySection() {
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);

  const handleCall = (number: string) => {
    window.open(`tel:${number.replace(/\s/g, '')}`, '_self');
  };

  return (
    <Card className="overflow-hidden border-red-200 dark:border-red-900">
      <CardHeader className="pb-3 bg-gradient-to-l from-red-500/10 to-orange-500/10">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">🆘</span>
          قسم الطوارئ
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* زر SOS */}
        <div className="text-center">
          <Button
            variant="destructive"
            size="lg"
            className="w-full h-16 text-xl font-bold gap-2 animate-pulse"
            onClick={() => setShowSOSConfirm(true)}
          >
            <AlertTriangle className="h-6 w-6" />
            SOS - طلب مساعدة
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            اضغط لإرسال موقعك والاتصال بخدمات الطوارئ
          </p>
        </div>

        {/* أرقام الطوارئ */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Phone className="h-4 w-4" />
            أرقام الطوارئ السريعة
          </h4>
          
          {emergencyNumbers.map((emergency, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${emergency.color} text-white`}>
                    <emergency.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">{emergency.name}</h5>
                    <p className="text-xs text-muted-foreground">{emergency.nameFr}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2 mb-2">
                {emergency.description}
              </p>
              
              {emergency.number ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => handleCall(emergency.number!)}
                >
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">{emergency.number}</span>
                </Button>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {emergency.numbers?.map((num, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs"
                      onClick={() => handleCall(num)}
                    >
                      <Phone className="h-3 w-3" />
                      <span dir="ltr">{num}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* معلومات إضافية */}
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">خدمة 24/24 ساعة</span>
          </div>
          <p className="text-xs text-muted-foreground">
            خدمات الطوارئ متوفرة على مدار الساعة
          </p>
        </div>
      </CardContent>

      {/* نافذة تأكيد SOS */}
      {showSOSConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <CardTitle>تأكيد طلب المساعدة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                سيتم إرسال موقعك الجغرافي والاتصال بخدمات الطوارئ
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowSOSConfirm(false)}
                >
                  إلغاء
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    setShowSOSConfirm(false);
                    handleCall('197');
                  }}
                >
                  تأكيد
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
