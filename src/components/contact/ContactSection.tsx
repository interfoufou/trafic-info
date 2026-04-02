'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Phone,
  MapPin,
  Printer,
  Ambulance,
  AlertTriangle,
  Shield,
  Mail,
  Clock,
  Building,
  Copy,
  Check,
  MessageSquare,
  Send
} from 'lucide-react';
// toast removed

const emergencyNumbers = [
  {
    name: 'النجدة',
    nameFr: 'Police Secours',
    numbers: ['197', '193'],
    icon: Shield,
    color: 'bg-blue-600',
    description: 'للإبلاغ عن الحوادث والطوارئ الأمنية',
  },
  {
    name: 'الإسعاف',
    nameFr: 'SAMU',
    numbers: ['190'],
    icon: Ambulance,
    color: 'bg-green-600',
    description: 'للحالات الطبية الطارئة',
  },
  {
    name: 'الحماية المدنية',
    nameFr: 'Protection Civile',
    numbers: ['198'],
    icon: AlertTriangle,
    color: 'bg-orange-600',
    description: 'للحرائق والكوارث',
  },
];

const adminNumbers = [
  { label: 'الهاتف 1', number: '71 343 201' },
  { label: 'الهاتف 2', number: '71 342 875' },
  { label: 'الهاتف 3', number: '71 342 787' },
];

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');

  const handleCall = (number: string) => {
    window.open(`tel:${number.replace(/\s/g, '')}`, '_self');
  };

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopied(number);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="bg-gradient-to-l from-blue-700 to-blue-800 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">التواصل</h2>
              <p className="text-blue-100 text-sm">مع إدارة شرطة المرور</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Numbers */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="pb-3 bg-red-50 dark:bg-red-950/30">
          <CardTitle className="text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            أرقام الطوارئ السريعة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {emergencyNumbers.map((emergency, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full ${emergency.color} flex items-center justify-center text-white`}>
                  <emergency.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{emergency.name}</h4>
                  <p className="text-xs text-muted-foreground">{emergency.nameFr}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{emergency.description}</p>
              <div className="flex gap-2">
                {emergency.numbers.map((num) => (
                  <Button
                    key={num}
                    variant="default"
                    className="flex-1 gap-2"
                    onClick={() => handleCall(num)}
                  >
                    <Phone className="h-4 w-4" />
                    <span dir="ltr">{num}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Administration Contact */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            إدارة شرطة المرور
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* العنوان */}
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300">العنوان</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  شارع الجمهورية 1001 تونس
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Administration de Police de Circulation
                </p>
              </div>
            </div>
          </div>

          {/* الهواتف */}
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-5 w-5 text-green-600" />
              <h4 className="font-medium">أرقام الهاتف</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {adminNumbers.map((item) => (
                <div key={item.number} className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <div className="flex items-center justify-center gap-1">
                    <span dir="ltr" className="font-mono font-medium">{item.number}</span>
                    <button
                      onClick={() => handleCopy(item.number)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      {copied === item.number ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              {adminNumbers.map((item) => (
                <Button
                  key={item.number}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleCall(item.number)}
                >
                  <Phone className="h-3 w-3 ml-1" />
                  اتصل
                </Button>
              ))}
            </div>
          </div>

          {/* الفاكس */}
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Printer className="h-5 w-5 text-purple-600" />
                <div>
                  <h4 className="font-medium">الفاكس</h4>
                  <p className="text-sm text-muted-foreground">Fax</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span dir="ltr" className="font-mono font-medium">71 343 146</span>
                <button
                  onClick={() => handleCopy('71 343 146')}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* ساعات العمل */}
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-300">ساعات العمل</h4>
                <p className="text-sm text-muted-foreground">خدمة متواصلة 24/24 ساعة - 7 أيام</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send Message */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            إرسال رسالة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                placeholder="اسمك الكامل"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                placeholder="رقم هاتفك"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">الرسالة</Label>
            <Textarea
              id="message"
              placeholder="اكتب رسالتك هنا..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          <Button className="w-full gap-2">
            <Send className="h-4 w-4" />
            إرسال الرسالة
          </Button>
        </CardContent>
      </Card>

      {/* Location Map Link */}
      <Card className="p-4">
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => window.open('https://maps.google.com/?q=Administration+de+Police+de+Circulation+Tunis', '_blank')}
        >
          <MapPin className="h-4 w-4" />
          عرض الموقع على الخريطة
        </Button>
      </Card>
    </div>
  );
}
