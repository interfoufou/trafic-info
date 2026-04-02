{
  "Name": "ServicesScreen",
  "Title": "الخدمات",
  "Version": "1",
  "Width": "320",
  "Height": "480",
  "Scrollable": "True",
  "Components": [
    {
      "Type": "Label",
      "Name": "lblTitle",
      "Text": "خدمات إدارة شرطة المرور",
      "FontSize": "22",
      "FontTypeface": "bold",
      "TextColor": "#FFFFFFFF",
      "BackgroundColor": "#FF7C3AED",
      "Width": "Fill parent",
      "Height": "60",
      "TextAlignment": "center"
    },
    {
      "Type": "VerticalScrollArrangement",
      "Name": "VSA1",
      "Width": "Fill parent",
      "Height": "Fill parent",
      "Components": [
        {
          "Type": "Button",
          "Name": "btnLicense",
          "Text": "🚗 رخصة السياقة",
          "FontSize": "16",
          "BackgroundColor": "#FFDBEAFE",
          "TextColor": "#FF1E40AF",
          "Width": "Fill parent",
          "Height": "55"
        },
        {
          "Type": "Button",
          "Name": "btnRoadworkPermit",
          "Text": "🚧 تراخيص الأشغال بالطريق",
          "FontSize": "16",
          "BackgroundColor": "#FFDCFCE7",
          "TextColor": "#FF166534",
          "Width": "Fill parent",
          "Height": "55"
        },
        {
          "Type": "Button",
          "Name": "btnRadar",
          "Text": "📷 الرادار الآلي",
          "FontSize": "16",
          "BackgroundColor": "#FFE0E7FF",
          "TextColor": "#FF4338CA",
          "Width": "Fill parent",
          "Height": "55"
        },
        {
          "Type": "Button",
          "Name": "btnViolations",
          "Text": "⚠️ المخالفات المرورية",
          "FontSize": "16",
          "BackgroundColor": "#FFFFEDD5",
          "TextColor": "#FF9A3412",
          "Width": "Fill parent",
          "Height": "55"
        },
        {
          "Type": "Button",
          "Name": "btnAccidents",
          "Text": "🛡️ الحوادث المرورية",
          "FontSize": "16",
          "BackgroundColor": "#FFFEE2E2",
          "TextColor": "#FF991B1B",
          "Width": "Fill parent",
          "Height": "55"
        },
        {
          "Type": "Button",
          "Name": "btnEServices",
          "Text": "💳 الخدمات الإلكترونية",
          "FontSize": "16",
          "BackgroundColor": "#FFF3E8FF",
          "TextColor": "#FF86198F",
          "Width": "Fill parent",
          "Height": "55"
        },
        {
          "Type": "Button",
          "Name": "btnFAQ",
          "Text": "❓ الأسئلة المتداولة",
          "FontSize": "16",
          "BackgroundColor": "FFCFFAFE",
          "TextColor": "#FF0E7490",
          "Width": "Fill parent",
          "Height": "55"
        },
        {
          "Type": "Button",
          "Name": "btnBack",
          "Text": "⬅️ رجوع",
          "FontSize": "16",
          "BackgroundColor": "#FF6B7280",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "50"
        }
      ]
    }
  ]
}
