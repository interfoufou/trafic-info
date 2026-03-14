# 🚗 TRAFFIC INFO TUNISIE

تطبيق السلامة المرورية التونسية - إدارة شرطة المرور

![Tunisia](https://img.shields.io/badge/Tunisia-🇹🇳-red)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 📱 الأقسام

1. **السلامة المرورية** - البلاغات المرورية والخريطة التفاعلية
2. **فضاء المواطن** - إرسال تنبيهات (صور/فيديو/رسالة)
3. **التواصل** - أرقام الطوارئ ومعلومات الاتصال
4. **الخدمات** - خدمات شرطة المرور

## 🌐 اللغات

- 🇹🇳 العربية
- 🇫🇷 Français
- 🇬🇧 English

## 🚀 النشر على Vercel

### الخطوة 1: رفع على GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/traffic-info-tunisie.git
git push -u origin main
```

### الخطوة 2: النشر على Vercel

1. اذهب إلى https://vercel.com
2. اضغط "Continue with GitHub"
3. اختر المستودع `traffic-info-tunisie`
4. اضغط "Deploy"

### الخطوة 3: إضافة قاعدة البيانات (مجاني)

1. في Vercel، اذهب إلى **Storage** → **Create Database**
2. اختر **Postgres**
3. اربطها بالمشروع
4. سيتم إضافة المتغيرات تلقائياً

## 🛠️ التشغيل محلياً

```bash
# تثبيت الحزم
npm install

# إعداد قاعدة البيانات
npx prisma generate
npx prisma db push

# تشغيل التطبيق
npm run dev
```

## 📞 معلومات التواصل

- **العنوان:** شارع الجمهورية 1001 تونس
- **الهواتف:** 71 343 201 | 71 342 875 | 71 342 787
- **الفاكس:** 71 343 146
- **الإسعاف:** 190 | 198
- **النجدة:** 197 | 193
- **البريد:** d.police.circulation.tun@gmail.com

## 📄 الرخصة

هذا المشروع حكومي تونسي.

---

**وزارة الداخلية - الجمهورية التونسية** 🇹🇳
