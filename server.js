const express = require('express');
const app = express();
const cors = require('cors');

// إعداد CORS عشان تيليجرام يسمح بالعرض
app.use(cors());

// الراوت الرئيسي
app.get('/watch', (req, res) => {
  const videoUrl = req.query.v;
  
  if (!videoUrl) {
    return res.status(400).send('رابط الفيديو غير موجود!');
  }

  const embedUrl = videoUrl
    .replace('watch?v=', 'embed/')   // تحويل رابط يوتيوب عادي إلى Embed
    .replace('youtu.be/', 'youtube.com/embed/');

  res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>مشاهدة الفيديو</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: black;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
    </head>
    <body>
      <iframe src="${embedUrl}" allowfullscreen></iframe>
    </body>
    </html>
  `);
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ السيرفر يعمل على المنفذ ${PORT}`);
});
