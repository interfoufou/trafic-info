{
  "Name": "SafetyScreen",
  "Title": "السلامة المرورية",
  "Version": "1",
  "Width": "320",
  "Height": "480",
  "Scrollable": "True",
  "Components": [
    {
      "Type": "Label",
      "Name": "lblTitle",
      "Text": "السلامة المرورية",
      "FontSize": "22",
      "FontTypeface": "bold",
      "TextColor": "#FFFFFFFF",
      "BackgroundColor": "#FF2563EB",
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
          "Type": "Label",
          "Name": "lblInfo",
          "Text": "معلومات حديثة عن حالة الطرق",
          "FontSize": "14",
          "Width": "Fill parent",
          "Height": "40"
        },
        {
          "Type": "Button",
          "Name": "btnCongestion",
          "Text": "🚦 الإكتظاظ المروري",
          "FontSize": "16",
          "BackgroundColor": "#FFEF4444",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "60"
        },
        {
          "Type": "Button",
          "Name": "btnReports",
          "Text": "📢 البلاغات المرورية",
          "FontSize": "16",
          "BackgroundColor": "#FF3B82F6",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "60"
        },
        {
          "Type": "Button",
          "Name": "btnRoadworks",
          "Text": "🚧 الأشغال بالطريق",
          "FontSize": "16",
          "BackgroundColor": "#FFF59E0B",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "60"
        },
        {
          "Type": "Button",
          "Name": "btnEvents",
          "Text": "🎭 التظاهرات",
          "FontSize": "16",
          "BackgroundColor": "#FFA855F7",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "60"
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
