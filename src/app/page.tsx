'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Dynamic import for map (leaflet doesn't work with SSR)
const TrafficMap = dynamic(() => import('@/components/TrafficMap'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center">
      <span className="text-slate-500">جاري تحميل الخريطة...</span>
    </div>
  ),
});
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Car,
  Users,
  Phone,
  Settings,
  MapPin,
  Clock,
  AlertTriangle,
  Send,
  ThumbsUp,
  Eye,
  CheckCircle,
  Navigation,
  Download,
  Share2,
  X
} from 'lucide-react';

// Translations
const translations = {
  ar: {
    appName: 'TRAFFIC INFO TUNISIE',
    subtitle: 'إدارة شرطة المرور',
    tabs: {
      safety: 'السلامة المرورية',
      citizen: 'فضاء المواطن',
      contact: 'التواصل',
      services: 'الخدمات',
    },
    install: 'تثبيت التطبيق',
    installDesc: 'ثبّت التطبيق على جهازك للوصول السريع',
    installBtn: 'تثبيت',
    later: 'لاحقاً',
    share: 'مشاركة',
    sections: {
      safety: {
        title: 'السلامة المرورية',
        subtitle: 'مستجدات الطرقات بكامل مرجع نظر الأمن الوطني',
        congestion: 'الإكتظاظ المروري',
        reports: 'البلاغات المرورية',
        roadworks: 'الأشغال بالطريق',
        events: 'التظاهرات',
        liveReports: 'البلاغات المباشرة',
        vote: 'تصويت',
        views: 'مشاهدة',
        active: 'نشط',
      },
      citizen: {
        title: 'فضاء المواطن المسؤول',
        subtitle: 'ساهم في تحسين السلامة المرورية',
        sendAlert: 'إرسال تنبيه',
        photos: 'صور',
        videos: 'فيديو',
        message: 'رسالة',
        financialFines: 'الخطايا المالية',
        financialFinesDesc: 'تفقد الخطايا متاعك',
        form: {
          type: 'نوع التنبيه',
          title: 'عنوان التنبيه',
          description: 'وصف تفصيلي',
          location: 'الموقع',
          submit: 'إرسال التنبيه',
          cancel: 'إلغاء',
          success: 'تم إرسال التنبيه بنجاح!',
          types: {
            traffic_jam: 'إكتظاظ مروري',
            accident: 'حادث مروري',
            roadwork: 'أشغال بالطريق',
            hazard: 'خطر على الطريق',
            police: 'نقطة شرطة',
            camera: 'رادار آلي',
            closure: 'إغلاق طريق',
            other: 'أخرى',
          }
        }
      },
      contact: {
        title: 'التواصل',
        subtitle: 'مع إدارة شرطة المرور',
        emergency: 'أرقام الطوارئ',
        police: 'النجدة',
        ambulance: 'الإسعاف',
        civilProtection: 'الحماية المدنية',
        workingHours: 'خدمة 24/24 ساعة',
      },
      services: {
        title: 'خدمات إدارة شرطة المرور',
        subtitle: 'مصالح و فرق شرطة المرور بين إيديك',
        license: 'رخصة السياقة',
        roadworkPermit: 'تراخيص الأشغال بالطريق',
        radar: 'الرادار الآلي',
        violations: 'المخالفات المرورية',
        accidents: 'الحوادث المرورية',
        eservices: 'الخدمات الإلكترونية',
        faq: 'الأسئلة المتداولة',
      },
    },
  },
  fr: {
    appName: 'TRAFFIC INFO TUNISIE',
    subtitle: 'Administration de Police de Circulation',
    tabs: {
      safety: 'Sécurité Routière',
      citizen: 'Espace Citoyen',
      contact: 'Contact',
      services: 'Services',
    },
    install: 'Installer l\'application',
    installDesc: 'Installez l\'application sur votre appareil pour un accès rapide',
    installBtn: 'Installer',
    later: 'Plus tard',
    share: 'Partager',
    sections: {
      safety: {
        title: 'Sécurité Routière',
        subtitle: 'Actualités routières dans toute la zone de compétence de la Sûreté Nationale',
        congestion: 'Encombrement',
        reports: 'Signalements',
        roadworks: 'Travaux',
        events: 'Événements',
        liveReports: 'Signalements en direct',
        vote: 'vote',
        views: 'vues',
        active: 'actif',
      },
      citizen: {
        title: 'Espace Citoyen Responsable',
        subtitle: 'Contribuez à la sécurité routière',
        sendAlert: 'Envoyer une alerte',
        photos: 'Photos',
        videos: 'Vidéos',
        message: 'Message',
        financialFines: 'Amendes financières',
        financialFinesDesc: 'Vérifier les amendes financières dues sur votre véhicule',
        form: {
          type: 'Type d\'alerte',
          title: 'Titre',
          description: 'Description',
          location: 'Localisation',
          submit: 'Envoyer',
          cancel: 'Annuler',
          success: 'Alerte envoyée!',
          types: {
            traffic_jam: 'Embouteillage',
            accident: 'Accident',
            roadwork: 'Travaux',
            hazard: 'Danger',
            police: 'Police',
            camera: 'Radar',
            closure: 'Route barrée',
            other: 'Autre',
          }
        }
      },
      contact: {
        title: 'Contact',
        subtitle: 'Administration de Police de Circulation',
        emergency: 'Numéros d\'urgence',
        police: 'Police Secours',
        ambulance: 'SAMU',
        civilProtection: 'Protection Civile',
        workingHours: 'Service 24/24h',
      },
      services: {
        title: 'Services',
        subtitle: 'Services et unités de police de circulation à votre portée',
        license: 'Permis de conduire',
        roadworkPermit: 'Autorisations de travaux',
        radar: 'Radar automatique',
        violations: 'Infractions',
        accidents: 'Accidents',
        eservices: 'E-Services',
        faq: 'FAQ',
      },
    },
  },
  en: {
    appName: 'TRAFFIC INFO TUNISIE',
    subtitle: 'Traffic Police Administration',
    tabs: {
      safety: 'Road Safety',
      citizen: 'Citizen Space',
      contact: 'Contact',
      services: 'Services',
    },
    install: 'Install App',
    installDesc: 'Install the app on your device for quick access',
    installBtn: 'Install',
    later: 'Later',
    share: 'Share',
    sections: {
      safety: {
        title: 'Road Safety',
        subtitle: 'Road updates across the entire National Security jurisdiction',
        congestion: 'Traffic Congestion',
        reports: 'Reports',
        roadworks: 'Road Works',
        events: 'Events',
        liveReports: 'Live Reports',
        vote: 'vote',
        views: 'views',
        active: 'active',
      },
      citizen: {
        title: 'Responsible Citizen Space',
        subtitle: 'Contribute to road safety',
        sendAlert: 'Send Alert',
        photos: 'Photos',
        videos: 'Videos',
        message: 'Message',
        financialFines: 'Financial Fines',
        financialFinesDesc: 'Check outstanding fines on your vehicle',
        form: {
          type: 'Alert Type',
          title: 'Alert Title',
          description: 'Description',
          location: 'Location',
          submit: 'Send Alert',
          cancel: 'Cancel',
          success: 'Alert sent successfully!',
          types: {
            traffic_jam: 'Traffic Jam',
            accident: 'Accident',
            roadwork: 'Road Work',
            hazard: 'Hazard',
            police: 'Police',
            camera: 'Speed Camera',
            closure: 'Road Closure',
            other: 'Other',
          }
        }
      },
      contact: {
        title: 'Contact',
        subtitle: 'Traffic Police Administration',
        emergency: 'Emergency Numbers',
        police: 'Emergency Police',
        ambulance: 'Ambulance',
        civilProtection: 'Civil Protection',
        workingHours: '24/7 Service',
      },
      services: {
        title: 'Traffic Police Services',
        subtitle: 'Traffic Police Services and Units at Your Fingertips',
        license: 'Driving License',
        roadworkPermit: 'Road Work Permits',
        radar: 'Speed Camera',
        violations: 'Violations',
        accidents: 'Accidents',
        eservices: 'E-Services',
        faq: 'FAQ',
      },
    },
  },
};

type Language = 'ar' | 'fr' | 'en';
type Tab = 'safety' | 'citizen' | 'contact' | 'services';

const reportTypeIcons: Record<string, string> = {
  traffic_jam: '🚗',
  accident: '🚨',
  roadwork: '🚧',
  hazard: '⚠️',
  police: '🚔',
  camera: '📷',
  closure: '⛔',
  other: '📢',
};

// Mock reports data
const mockReports = [
  {
    id: '1',
    type: 'traffic_jam',
    title: 'إكتظاظ مروري بوسط العاصمة',
    description: 'تراكم مياه الأمطار مستوى شارع الجمهورية',
    location: 'وسط العاصمة - المرسى',
    status: 'active',
    votes: 15,
    views: 120,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'roadwork',
    title: 'أشغال مدخل المحول الجنوبي للعاصمة',
    description: 'أسغال إزالة قنطرة المروج',
    location: 'المحول الجنوبي - تونس',
    status: 'active',
    votes: 8,
    views: 45,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('safety');
  const [language, setLanguage] = useState<Language>('ar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
  });
  
  // PWA Install state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const t = translations[language];
  const isRTL = language === 'ar';

  const tabs = [
    { id: 'safety' as Tab, label: t.tabs.safety, icon: Car },
    { id: 'citizen' as Tab, label: t.tabs.citizen, icon: Users },
    { id: 'contact' as Tab, label: t.tabs.contact, icon: Phone },
    { id: 'services' as Tab, label: t.tabs.services, icon: Settings },
  ];

  // PWA Install prompt
  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TRAFFIC INFO TUNISIE',
          text: language === 'ar' 
            ? 'تطبيق السلامة المرورية التونسية' 
            : language === 'fr' 
            ? 'Application de sécurité routière tunisienne'
            : 'Tunisian Road Safety App',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    }
  };

  const handleSubmitAlert = () => {
    setSubmitSuccess(true);
    setTimeout(() => {
      setAlertDialogOpen(false);
      setSubmitSuccess(false);
      setFormData({ type: '', title: '', description: '', location: '' });
    }, 2000);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return language === 'ar' ? `منذ ${minutes} دقيقة` : 
             language === 'fr' ? `Il y a ${minutes} min` : `${minutes}m ago`;
    } else {
      return language === 'ar' ? `منذ ${hours} ساعة` :
             language === 'fr' ? `Il y a ${hours}h` : `${hours}h ago`;
    }
  };

  return (
    <div 
      className={`min-h-screen flex flex-col bg-gray-100 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="إدارة شرطة المرور" 
                width={48} 
                height={48} 
                className="w-12 h-12 rounded-lg object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-white">{t.appName}</h1>
                <p className="text-xs text-gray-400">{t.subtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-700 text-white shadow-md'
                      : 'text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Download Project Button */}
              <a
                href="/traffic-info-tunisie.zip"
                download
                className="flex items-center gap-1.5 px-3 py-2 bg-red-700 text-white rounded-lg text-sm font-medium shadow-md hover:bg-red-800"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'ar' ? 'تحميل التطبيق' : language === 'fr' ? 'Télécharger l\'application' : 'Download App'}</span>
              </a>
              
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="p-2 text-gray-300 hover:bg-gray-800 rounded-lg"
              >
                <Share2 className="h-5 w-5" />
              </button>
              
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="ar">🇹🇳 العربية</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
              </select>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-300"
              >
                <Car className="h-6 w-6 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-gray-700 mt-2 pt-4">
              <div className="grid grid-cols-2 gap-2">
                {tabs.map((tab) => (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-red-700 text-white'
                        : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Install Banner */}
      {showInstallBanner && !isInstalled && (
        <div className="bg-gray-900 text-white px-4 py-3">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Download className="h-6 w-6" />
              <div>
                <p className="font-bold">{t.install}</p>
                <p className="text-sm text-gray-400">{t.installDesc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleInstallApp}
                className="bg-red-700 text-white hover:bg-red-800"
              >
                <Download className="h-4 w-4 mr-1" />
                {t.installBtn}
              </Button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-4 pb-24 md:pb-6">
        {/* Safety Section */}
        {activeTab === 'safety' && (
          <div className="space-y-4">
            <Card className="bg-gray-900 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{t.sections.safety.title}</h2>
                    <p className="text-gray-400 text-sm">{t.sections.safety.subtitle}</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                    <Car className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Categories */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: '🚦', label: t.sections.safety.congestion, color: 'bg-red-700' },
                { icon: '📢', label: t.sections.safety.reports, color: 'bg-gray-700' },
                { icon: '🚧', label: t.sections.safety.roadworks, color: 'bg-orange-700' },
                { icon: '🎭', label: t.sections.safety.events, color: 'bg-gray-600' },
              ].map((cat, idx) => (
                <Card key={idx} className={`${cat.color} p-3 text-center text-white cursor-pointer hover:opacity-90 transition-opacity`}>
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <h3 className="text-xs font-semibold">{cat.label}</h3>
                </Card>
              ))}
            </div>

            {/* Map Section */}
            <Card className="shadow-lg border border-gray-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-64 md:h-80">
                  <TrafficMap reports={[]} language={language} />
                </div>
              </CardContent>
            </Card>

            {/* Live Reports */}
            <Card className="shadow-lg border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                    {t.sections.safety.liveReports}
                  </h3>
                  <Badge className="bg-gray-100 text-gray-700 border border-gray-200">{mockReports.length}</Badge>
                </div>

                <div className="space-y-3">
                  {mockReports.map((report) => (
                    <Card key={report.id} className="p-4 bg-gray-50 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{reportTypeIcons[report.type] || '📢'}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800">{report.title}</h4>
                            <Badge variant="outline" className="border-gray-600 text-gray-700">
                              {t.sections.safety.active}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {report.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(report.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-200">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <ThumbsUp className="h-3 w-3" />
                              {report.votes} {t.sections.safety.vote}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Eye className="h-3 w-3" />
                              {report.views} {t.sections.safety.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Citizen Section */}
        {activeTab === 'citizen' && (
          <div className="space-y-4">
            <Card className="bg-gray-900 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{t.sections.citizen.title}</h2>
                    <p className="text-gray-300 text-sm">{t.sections.citizen.subtitle}</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* بطاقة الخطايا المالية - Financial Fines Card */}
            <Card className="shadow-lg border-2 border-red-600 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Image 
                    src="/icons/fines.png" 
                    alt="الخطايا المالية" 
                    width={80} 
                    height={80} 
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-red-900 text-2xl">{t.sections.citizen.financialFines}</h3>
                    <p className="text-base text-red-700 mt-2">{t.sections.citizen.financialFinesDesc}</p>
                  </div>
                  <Button 
                    asChild
                    className="bg-red-700 hover:bg-red-800 text-white shadow-lg px-8 py-3 text-lg"
                  >
                    <a href="https://amendes.finances.gov.tn/jsp/Amende/cons_amende.jsp" target="_blank" rel="noopener noreferrer">
                      {language === 'ar' ? 'الرابط' : language === 'fr' ? 'Lien' : 'Link'}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Media Options */}
            <Card className="shadow-lg border border-gray-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-gray-100 rounded-xl">
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm font-medium text-gray-700">{t.sections.citizen.photos}</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-xl">
                    <div className="text-3xl mb-2">🎥</div>
                    <p className="text-sm font-medium text-gray-700">{t.sections.citizen.videos}</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-xl">
                    <div className="text-3xl mb-2">💬</div>
                    <p className="text-sm font-medium text-gray-700">{t.sections.citizen.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Dialog */}
            <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-gray-800 hover:bg-gray-900 h-12 text-lg shadow-lg">
                  <Send className="h-5 w-5 mr-2" />
                  {t.sections.citizen.sendAlert}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">{t.sections.citizen.sendAlert}</DialogTitle>
                </DialogHeader>

                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700">{t.sections.citizen.form.success}</p>
                  </div>
                ) : (
                  <div className="space-y-4 pt-4">
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.sections.citizen.form.type} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.sections.citizen.form.types).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {reportTypeIcons[key]} {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder={t.sections.citizen.form.title}
                    />

                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={t.sections.citizen.form.description}
                      rows={3}
                    />

                    <div className="flex gap-2">
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder={t.sections.citizen.form.location}
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1" onClick={() => setAlertDialogOpen(false)}>
                        {t.sections.citizen.form.cancel}
                      </Button>
                      <Button className="flex-1 bg-gray-800 hover:bg-gray-900" onClick={handleSubmitAlert}>
                        <Send className="h-4 w-4 mr-2" />
                        {t.sections.citizen.form.submit}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <Card className="bg-gray-900 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{t.sections.contact.title}</h2>
                    <p className="text-gray-400 text-sm">{t.sections.contact.subtitle}</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                    <Phone className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Numbers */}
            <Card className="shadow-lg border border-gray-200">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {t.sections.contact.emergency}
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🚔</span>
                      <div>
                        <p className="font-medium text-gray-700">{t.sections.contact.police}</p>
                        <p className="text-lg font-bold text-gray-800">197 - 193</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🚑</span>
                      <div>
                        <p className="font-medium text-gray-700">{t.sections.contact.ambulance}</p>
                        <p className="text-lg font-bold text-gray-800">190</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🚒</span>
                      <div>
                        <p className="font-medium text-gray-700">{t.sections.contact.civilProtection}</p>
                        <p className="text-lg font-bold text-gray-800">198</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Administration Numbers */}
            <Card className="shadow-lg border border-gray-200">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  {language === 'ar' ? 'أرقام إدارة شرطة المرور' : language === 'fr' ? 'Numéros de l\'Administration' : 'Traffic Police Administration'}
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'الهاتف 1' : 'Tel 1'}</p>
                    <p className="font-bold text-gray-800 text-lg" dir="ltr">71 343 201</p>
                    <a href="tel:71343201" className="text-xs text-red-600 hover:underline">{language === 'ar' ? 'اتصل' : 'Call'}</a>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'الهاتف 2' : 'Tel 2'}</p>
                    <p className="font-bold text-gray-800 text-lg" dir="ltr">71 342 875</p>
                    <a href="tel:71342875" className="text-xs text-red-600 hover:underline">{language === 'ar' ? 'اتصل' : 'Call'}</a>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'الهاتف 3' : 'Tel 3'}</p>
                    <p className="font-bold text-gray-800 text-lg" dir="ltr">71 342 787</p>
                    <a href="tel:71342787" className="text-xs text-red-600 hover:underline">{language === 'ar' ? 'اتصل' : 'Call'}</a>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📠</span>
                    <div>
                      <p className="text-xs text-gray-500">{language === 'ar' ? 'الفاكس' : 'Fax'}</p>
                      <p className="font-bold text-gray-800" dir="ltr">71 343 146</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <p className="font-medium text-gray-800">{language === 'ar' ? 'ساعات العمل' : language === 'fr' ? 'Heures d\'ouverture' : 'Working Hours'}</p>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'خدمة متواصلة 24/24 ساعة - 7 أيام' : language === 'fr' ? 'Service 24h/24 - 7 jours' : '24/7 Service'}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-medium text-gray-800">{language === 'ar' ? 'العنوان' : language === 'fr' ? 'Adresse' : 'Address'}</p>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'شارع الجمهورية 1001 تونس' : 'Rue de la République 1001 Tunis'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="shadow-lg border border-gray-200">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 mb-1">📧 {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</p>
                <a href="mailto:d.police.circulation.tun@gmail.com" className="font-bold text-gray-800 text-lg underline">
                  d.police.circulation.tun@gmail.com
                </a>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Services Section */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <Card className="bg-gray-800 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{t.sections.services.title}</h2>
                    <p className="text-gray-300 text-sm">{t.sections.services.subtitle}</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <Settings className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: '🚗', title: t.sections.services.license },
                { icon: '🚧', title: t.sections.services.roadworkPermit },
                { icon: 'radar', title: t.sections.services.radar },
                { icon: '⚠️', title: t.sections.services.violations },
                { icon: '🛡️', title: t.sections.services.accidents },
                { icon: '💳', title: t.sections.services.eservices },
                { icon: '❓', title: t.sections.services.faq },
              ].map((service, index) => (
                <Card key={index} className="bg-gray-100 border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {service.icon === 'radar' ? (
                        <Image src="/icons/radar.png" alt="Radar" width={32} height={32} className="w-8 h-8 object-contain" />
                      ) : (
                        <div className="text-2xl">{service.icon}</div>
                      )}
                      <span className="font-medium text-gray-700">{service.title}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold">{t.appName}</span>
            </div>
            <div className="text-gray-400">🇹🇳 {language === 'ar' ? 'الجمهورية التونسية' : 'République Tunisienne'}</div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-lg z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs ${
                activeTab === tab.id ? 'bg-gray-800 text-white' : 'text-gray-400'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
