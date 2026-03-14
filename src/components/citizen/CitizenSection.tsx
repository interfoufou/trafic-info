'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Camera,
  Video,
  MessageSquare,
  Send,
  Navigation,
  CheckCircle,
  MapPin,
} from 'lucide-react';

interface CitizenSectionProps {
  language: 'ar' | 'fr' | 'en';
}

export default function CitizenSection({ language }: CitizenSectionProps) {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const t = {
    ar: {
      title: 'فضاء المواطن المسؤول',
      subtitle: 'ساهم في تحسين السلامة المرورية',
      sendAlert: 'إرسال تنبيه',
      photos: 'صور',
      videos: 'فيديو',
      message: 'رسالة',
      success: 'تم إرسال التنبيه بنجاح!',
      type: 'نوع التنبيه',
      titlePlaceholder: 'عنوان التنبيه',
      description: 'وصف تفصيلي',
      location: 'الموقع',
      useLocation: 'استخدم موقعي',
      submit: 'إرسال',
      cancel: 'إلغاء',
    },
    fr: {
      title: 'Espace Citoyen Responsable',
      subtitle: 'Contribuez à la sécurité routière',
      sendAlert: 'Envoyer une alerte',
      photos: 'Photos',
      videos: 'Vidéos',
      message: 'Message',
      success: 'Alerte envoyée avec succès!',
      type: 'Type d\'alerte',
      titlePlaceholder: 'Titre de l\'alerte',
      description: 'Description détaillée',
      location: 'Localisation',
      useLocation: 'Utiliser ma position',
      submit: 'Envoyer',
      cancel: 'Annuler',
    },
    en: {
      title: 'Responsible Citizen Space',
      subtitle: 'Contribute to road safety',
      sendAlert: 'Send Alert',
      photos: 'Photos',
      videos: 'Videos',
      message: 'Message',
      success: 'Alert sent successfully!',
      type: 'Alert Type',
      titlePlaceholder: 'Alert Title',
      description: 'Detailed Description',
      location: 'Location',
      useLocation: 'Use my location',
      submit: 'Send',
      cancel: 'Cancel',
    },
  }[language];

  const handleSubmit = () => {
    setSubmitSuccess(true);
    setTimeout(() => {
      setAlertDialogOpen(false);
      setSubmitSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-l from-green-600 to-green-700 text-white border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
              <p className="text-green-100 text-sm">{t.subtitle}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">👥</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
              <Camera className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">{t.photos}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer">
              <Video className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">{t.videos}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">{t.message}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg shadow-lg">
            <Send className="h-5 w-5 mr-2" />
            {t.sendAlert}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-700">{t.sendAlert}</DialogTitle>
          </DialogHeader>

          {submitSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-green-600">{t.success}</p>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.location}
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <Button variant="outline">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setAlertDialogOpen(false)}>
                  {t.cancel}
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                  <Send className="h-4 w-4 mr-2" />
                  {t.submit}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
