# 🚀 كيفية نشر TRAFIC INFO TUNISIE على Netlify

## الطريقة الأولى: النشر من GitHub (الأسهل)

### الخطوة 1: رفع المشروع إلى GitHub
1. أنشئ مستودع جديد على GitHub
2. ارفع المشروع:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trafic-info-tunisie.git
git push -u origin main
```

### الخطوة 2: ربط Netlify بـ GitHub
1. اذهب إلى https://app.netlify.com
2. اضغط "Add new site" → "Import an existing project"
3. اختر "GitHub"
4. اختر المستودع "trafic-info-tunisie"
5. الإعدادات ستكون جاهزة تلقائياً
6. اضغط "Deploy site"

---

## الطريقة الثانية: السحب والإفلات

### الخطوة 1: بناء المشروع
```bash
bun run build
```

### الخطوة 2: رفع المجلد
1. اذهب إلى https://app.netlify.com
2. اسحب مجلد `.next` إلى صفحة Netlify

---

## الطريقة الثالثة: استخدام Netlify CLI

### الخطوة 1: تسجيل الدخول
```bash
netlify login
```

### الخطوة 2: نشر المشروع
```bash
netlify deploy --prod
```

---

## ✅ ملاحظات مهمة
- المشروع جاهز للنشر مع ملف `netlify.toml`
- يدعم Next.js 16 مع App Router
- جميع الإعدادات مُعدة مسبقاً

## 📧 للتواصل
- d.police.circulation.tun@gmail.com
