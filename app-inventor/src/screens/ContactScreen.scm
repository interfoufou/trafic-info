{
  "Name": "ContactScreen",
  "Title": "التواصل",
  "Version": "1",
  "Width": "320",
  "Height": "480",
  "Scrollable": "True",
  "Components": [
    {
      "Type": "Label",
      "Name": "lblTitle",
      "Text": "التواصل",
      "FontSize": "22",
      "FontTypeface": "bold",
      "TextColor": "#FFFFFFFF",
      "BackgroundColor": "#FF1E40AF",
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
          "Name": "lblEmergency",
          "Text": "🚨 أرقام الطوارئ",
          "FontSize": "18",
          "FontTypeface": "bold",
          "TextColor": "#FFDC2626",
          "Width": "Fill parent",
          "Height": "40"
        },
        {
          "Type": "HorizontalArrangement",
          "Name": "HA1",
          "Width": "Fill parent",
          "Height": "60",
          "Components": [
            {
              "Type": "Label",
              "Name": "lblPolice",
              "Text": "🚔 النجدة: 197 - 193",
              "FontSize": "16",
              "Width": "200",
              "Height": "60"
            },
            {
              "Type": "Button",
              "Name": "btnCallPolice",
              "Text": "اتصال",
              "FontSize": "14",
              "BackgroundColor": "#FF2563EB",
              "TextColor": "#FFFFFFFF",
              "Width": "80",
              "Height": "50"
            }
          ]
        },
        {
          "Type": "HorizontalArrangement",
          "Name": "HA2",
          "Width": "Fill parent",
          "Height": "60",
          "Components": [
            {
              "Type": "Label",
              "Name": "lblAmbulance",
              "Text": "🚑 الإسعاف: 190",
              "FontSize": "16",
              "Width": "200",
              "Height": "60"
            },
            {
              "Type": "Button",
              "Name": "btnCallAmbulance",
              "Text": "اتصال",
              "FontSize": "14",
              "BackgroundColor": "#FF16A34A",
              "TextColor": "#FFFFFFFF",
              "Width": "80",
              "Height": "50"
            }
          ]
        },
        {
          "Type": "HorizontalArrangement",
          "Name": "HA3",
          "Width": "Fill parent",
          "Height": "60",
          "Components": [
            {
              "Type": "Label",
              "Name": "lblCivil",
              "Text": "🚒 الحماية المدنية: 198",
              "FontSize": "16",
              "Width": "200",
              "Height": "60"
            },
            {
              "Type": "Button",
              "Name": "btnCallCivil",
              "Text": "اتصال",
              "FontSize": "14",
              "BackgroundColor": "#FFEA580C",
              "TextColor": "#FFFFFFFF",
              "Width": "80",
              "Height": "50"
            }
          ]
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
          "Name": "lblEmail",
          "Text": "📧 البريد الإلكتروني",
          "FontSize": "16",
          "FontTypeface": "bold",
          "Width": "Fill parent",
          "Height": "40"
        },
        {
          "Type": "Label",
          "Name": "lblEmailAddress",
          "Text": "d.police.circulation.tun@gmail.com",
          "FontSize": "14",
          "TextColor": "#FF0891B2",
          "Width": "Fill parent",
          "Height": "40"
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
      "Type": "PhoneCall",
      "Name": "PhoneCall1"
    }
  ]
}
