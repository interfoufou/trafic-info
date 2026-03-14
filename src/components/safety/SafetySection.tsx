'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  TrafficCone, 
  AlertTriangle, 
  Construction, 
  Trophy,
  MapPin,
  Clock,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface Report {
  id: string;
  type: string;
  title: string;
  description?: string;
  location: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  type: 'sport' | 'cultural';
  impact: 'high' | 'medium' | 'low';
}

export function SafetySection() {
  const [congestions, setCongestions] = useState<Report[]>([]);
  const [alerts, setAlerts] = useState<Report[]>([]);
  const [roadworks, setRoadworks] = useState<Report[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (data.success) {
        const reports = data.data;
        setCongestions(reports.filter((r: Report) => r.type === 'traffic_jam'));
        setAlerts(reports.filter((r: Report) => r.type === 'accident' || r.type === 'hazard'));
        setRoadworks(reports.filter((r: Report) => r.type === 'roadwork'));
      }
      
      // بيانات تجريبية للتظاهرات
      setEvents([
        {
          id: '1',
          title: 'مباراة كرة القدم - الترجي التونسي',
          location: 'ملعب رادس',
          date: new Date().toISOString(),
          type: 'sport',
          impact: 'high',
        },
        {
          id: '2',
          title: 'مهرجان الموسيقى التونسية',
          location: 'المسرح البلدي تونس',
          date: new Date().toISOString(),
          type: 'cultural',
          impact: 'medium',
        },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'تأثير كبير';
      case 'medium':
        return 'تأثير متوسط';
      default:
        return 'تأثير خفيف';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'عاجل';
      case 'high':
        return 'مهم';
      case 'medium':
        return 'متوسط';
      default:
        return 'عادي';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-muted rounded-xl h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="bg-gradient-to-l from-blue-600 to-blue-700 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">السلامة المرورية</h2>
              <p className="text-blue-100 text-sm">معلومات حديثة عن حالة الطرق</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TrafficCone className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="congestion" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto gap-1 bg-muted p-1">
          <TabsTrigger value="congestion" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">الإكتظاظ</span>
            {congestions.length > 0 && (
              <Badge variant="destructive" className="h-5 px-1 text-[10px]">{congestions.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">البلاغات</span>
            {alerts.length > 0 && (
              <Badge variant="destructive" className="h-5 px-1 text-[10px]">{alerts.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="roadworks" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white">
            <Construction className="h-4 w-4" />
            <span className="text-xs">الأشغال</span>
            {roadworks.length > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-[10px]">{roadworks.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="events" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white">
            <Trophy className="h-4 w-4" />
            <span className="text-xs">التظاهرات</span>
          </TabsTrigger>
        </TabsList>

        {/* الإكتظاظ المروري */}
        <TabsContent value="congestion" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                الإكتظاظ المروري
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {congestions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>لا توجد تقارير عن إكتظاظ حالياً</p>
                    <p className="text-xs mt-1">الطرق في وضعية جيدة</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {congestions.map((item) => (
                      <div key={item.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)} mt-1.5 animate-pulse`} />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(item.createdAt).toLocaleDateString('ar-TN')}</span>
                            </div>
                          </div>
                          <Badge variant={item.priority === 'urgent' ? 'destructive' : 'secondary'}>
                            {getPriorityLabel(item.priority)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* البلاغات المرورية */}
        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                البلاغات المرورية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {alerts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>لا توجد بلاغات حالياً</p>
                    <p className="text-xs mt-1">الوضع المروري مستقر</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {alerts.map((item) => (
                      <div key={item.id} className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الأشغال الجارية */}
        <TabsContent value="roadworks" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Construction className="h-5 w-5 text-amber-500" />
                الأشغال الجارية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {roadworks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Construction className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>لا توجد أشغال جارية حالياً</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {roadworks.map((item) => (
                      <div key={item.id} className="p-4 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                            <Construction className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التظاهرات الرياضية والثقافية */}
        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-500" />
                التظاهرات الرياضية والثقافية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {events.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>لا توجد تظاهرات مجدولة</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div key={event.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                            event.type === 'sport' ? 'bg-green-500' : 'bg-purple-500'
                          }`}>
                            {event.type === 'sport' ? '⚽' : '🎭'}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(event.date).toLocaleDateString('ar-TN')}</span>
                            </div>
                          </div>
                          <Badge className={getPriorityColor(event.impact)}>
                            {getImpactLabel(event.impact)}
                          </Badge>
                        </div>
                        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/30 rounded text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1">
                          <ArrowRight className="h-3 w-3" />
                          <span>قد يؤثر على حركة المرور في المنطقة</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
