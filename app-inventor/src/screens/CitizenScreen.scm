{
  "Name": "CitizenScreen",
  "Title": "فضاء المواطن",
  "Version": "1",
  "Width": "320",
  "Height": "480",
  "Scrollable": "True",
  "Components": [
    {
      "Type": "Label",
      "Name": "lblTitle",
      "Text": "فضاء المواطن المسؤول",
      "FontSize": "22",
      "FontTypeface": "bold",
      "TextColor": "#FFFFFFFF",
      "BackgroundColor": "#FF16A34A",
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
          "Name": "lblFinesTitle",
          "Text": "💰 الخطايا المالية",
          "FontSize": "20",
          "FontTypeface": "bold",
          "TextColor": "#FF92400E",
          "Width": "Fill parent",
          "Height": "50"
        },
        {
          "Type": "Label",
          "Name": "lblFinesDesc",
          "Text": "تفقد الخطايا متاعك",
          "FontSize": "14",
          "TextColor": "#FF78716C",
          "Width": "Fill parent",
          "Height": "40"
        },
        {
          "Type": "Button",
          "Name": "btnCheckFines",
          "Text": "التحقق الآن",
          "FontSize": "18",
          "BackgroundColor": "#FFF59E0B",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "60"
        },
        {
          "Type": "Label",
          "Name": "lblSpace1",
          "Text": "",
          "Width": "Fill parent",
          "Height": "20"
        },
        {
          "Type": "Label",
          "Name": "lblSendAlert",
          "Text": "📤 إرسال تنبيه",
          "FontSize": "18",
          "FontTypeface": "bold",
          "Width": "Fill parent",
          "Height": "40"
        },
        {
          "Type": "Button",
          "Name": "btnPhotos",
          "Text": "📸 صور",
          "FontSize": "14",
          "BackgroundColor": "FF3B82F6",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "50"
        },
        {
          "Type": "Button",
          "Name": "btnVideos",
          "Text": "🎥 فيديو",
          "FontSize": "14",
          "BackgroundColor": "#FFA855F7",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "50"
        },
        {
          "Type": "Button",
          "Name": "btnMessage",
          "Text": "💬 رسالة",
          "FontSize": "14",
          "BackgroundColor": "#FF16A34A",
          "TextColor": "#FFFFFFFF",
          "Width": "Fill parent",
          "Height": "50"
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
    },
    {
      "Type": "Notifier",
      "Name": "Notifier1"
    },
    {
      "Type": "ActivityStarter",
      "Name": "ActivityStarter1"
    }
  ]
}
