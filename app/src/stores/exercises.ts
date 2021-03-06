export default {
  '1bar': [
    {
      id: '1bar-brush-top',
      name: 'Brush oben',
      arrows: [
        {
          start: {
            x: -3,
            y: -487,
          },
          end: {
            x: -59,
            y: 486,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 16,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '1bar-brush-bottom',
      name: 'Brush unten',
      arrows: [
        {
          start: {
            x: -3,
            y: -487,
          },
          end: {
            x: 59,
            y: 486,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': -16,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '1bar-bank-top',
      name: 'Bande oben',
      arrows: [
        {
          start: {
            x: -91,
            y: -487,
          },
          end: {
            x: -303,
            y: -30,
          },
        },
        {
          start: {
            x: -300,
            y: 32,
          },
          end: {
            x: -100,
            y: 512,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 46,
          '2bar': -41,
          '3bar': -63,
          '5bar': 24,
        },
        blue: {
          '1bar': -82,
          '2bar': -50,
          '3bar': 26,
          '5bar': 24,
        },
      },
    },
    {
      id: '1bar-bank-bottom',
      name: 'Bande unten',
      arrows: [
        {
          start: {
            x: 98,
            y: -483,
          },
          end: {
            x: 293,
            y: -61,
          },
        },
        {
          start: {
            x: 293,
            y: 54,
          },
          end: {
            x: 93,
            y: 503,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 76,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
  ],
  '2bar': [
    {
      id: '2bar-center-bank-bank-top',
      name: 'Mitte Bande: Bande oben',
      arrows: [
        {
          start: {
            x: 0,
            y: -360,
          },
          end: {
            x: -300,
            y: 50,
          },
        },
        {
          start: {
            x: -300,
            y: 130,
          },
          end: {
            x: -50,
            y: 400,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 60,
        },
        blue: {
          '1bar': 0,
          '2bar': -55,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '2bar-center-bank-bank-bottom',
      name: 'Mitte Bande: Bande unten',
      arrows: [
        {
          start: {
            x: 0,
            y: -360,
          },
          end: {
            x: 300,
            y: 50,
          },
        },
        {
          start: {
            x: 300,
            y: 130,
          },
          end: {
            x: 50,
            y: 400,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': -30,
        },
        blue: {
          '1bar': 0,
          '2bar': -55,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '2bar-center-bank-straight',
      name: 'Mitte Bande: Gerade',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': -53,
          '3bar': 0,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: 0,
            y: -345,
          },
          end: {
            x: 0,
            y: 476,
          },
        },
      ],
    },
    {
      id: '2bar-center-bank-brush-left',
      name: 'Mitte Bande: Links',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 58,
          '3bar': 0,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: 0,
            y: -341,
          },
          end: {
            x: -64,
            y: 516,
          },
        },
      ],
    },
    {
      id: '2bar-center-bank-brush-right',
      name: 'Mitte Bande: Rechts',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': -55,
          '3bar': 0,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: 0,
            y: -341,
          },
          end: {
            x: 66,
            y: 489,
          },
        },
      ],
    },
    {
      id: '2bar-center-bank-brush-pass-top',
      name: 'Mitte Bande: Pass oben',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': -56,
          '3bar': -86,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: 0,
            y: -345,
          },
          end: {
            x: -113,
            y: 170,
          },
        },
      ],
    },
    {
      id: '2bar-center-bank-brush-pass-bottom',
      name: 'Mitte Bande: Pass unten',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': -56,
          '3bar': -88,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: 0,
            y: -332,
          },
          end: {
            x: 52,
            y: 188,
          },
        },
      ],
    },
    {
      id: '2bar-pin-right-long-short',
      name: 'Pin Rechtslang: Kurz',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': -4,
          '3bar': 0,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: -129,
            y: -341,
          },
          end: {
            x: -75,
            y: -341,
          },
        },
        {
          start: {
            x: -62,
            y: -345,
          },
          end: {
            x: -62,
            y: 485,
          },
        },
      ],
    },
    {
      id: '2bar-pin-right-long-middle',
      name: 'Pin Rechtslang: Mitte',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 5,
          '3bar': 0,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: -110,
            y: -336,
          },
          end: {
            x: -18,
            y: -336,
          },
        },
        {
          start: {
            x: 0,
            y: -327,
          },
          end: {
            x: 0,
            y: 485,
          },
        },
      ],
    },
    {
      id: '2bar-pin-right-long-long',
      name: 'Pin Rechtslang: Lang',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 6,
          '3bar': 0,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: -102,
            y: -345,
          },
          end: {
            x: 58,
            y: -345,
          },
        },
        {
          start: {
            x: 76,
            y: -332,
          },
          end: {
            x: 76,
            y: 498,
          },
        },
      ],
    },
    {
      id: '2bar-pin-right-long-bank-top',
      name: 'Pin Rechtslang: Bande oben',
      arrows: [
        {
          start: {
            x: -118,
            y: -341,
          },
          end: {
            x: -300,
            y: -43,
          },
        },
        {
          start: {
            x: -292,
            y: 28,
          },
          end: {
            x: -86,
            y: 485,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '2bar-pin-right-long-bank-bottom',
      name: 'Pin Rechtslang: Bande unten',
      arrows: [
        {
          start: {
            x: -116,
            y: -332,
          },
          end: {
            x: 293,
            y: 14,
          },
        },
        {
          start: {
            x: 288,
            y: 41,
          },
          end: {
            x: -29,
            y: 472,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '2bar-pin-right-long-short-angled',
      name: 'Pin Rechtslang: Kurz Schräg',
      arrows: [
        {
          start: {
            x: -121,
            y: -341,
          },
          end: {
            x: -83,
            y: -341,
          },
        },
        {
          start: {
            x: -64,
            y: -336,
          },
          end: {
            x: 60,
            y: 489,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '2bar-pin-right-long-middle-angled',
      name: 'Pin Rechtslang: Mitte Schräg',
      arrows: [
        {
          start: {
            x: -113,
            y: -341,
          },
          end: {
            x: -13,
            y: -341,
          },
        },
        {
          start: {
            x: 0,
            y: -327,
          },
          end: {
            x: 76,
            y: 476,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '2bar-pin-right-long-slice',
      name: 'Pin Rechtslang: Slice',
      arrows: [
        {
          start: {
            x: -116,
            y: -341,
          },
          end: {
            x: -89,
            y: -345,
          },
        },
        {
          start: {
            x: -75,
            y: -350,
          },
          end: {
            x: 25,
            y: 481,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '2bar-pin-right-long-cutback',
      name: 'Pin Rechtslang: Cutback',
      arrows: [
        {
          start: {
            x: -105,
            y: -336,
          },
          end: {
            x: -167,
            y: -336,
          },
        },
        {
          start: {
            x: -167,
            y: -314,
          },
          end: {
            x: -64,
            y: 476,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '2bar-pin-right-long-pass-to-middle',
      name: 'Pin Rechtslang: Gekurbelter Pass auf Mittelpuppe',
      arrows: [
        {
          start: {
            x: -118,
            y: -341,
          },
          end: {
            x: -118,
            y: 174,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 64,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': -83,
          '5bar': -58,
        },
      },
    },
    {
      id: '2bar-pin-right-long-brush-to-top',
      name: 'Pin Rechtslang: Brushpass auf obere Aussenpuppe',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': -82,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: -116,
            y: -341,
          },
          end: {
            x: -294,
            y: 174,
          },
        },
      ],
    },
    {
      id: '2bar-pin-right-long-stick-wall-top',
      name: 'Pin Rechtslang: Bandenpass auf obere Aussenpuppe',
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': -84,
          '5bar': 0,
        },
      },
      arrows: [
        {
          start: {
            x: -113,
            y: -345,
          },
          end: {
            x: -319,
            y: -341,
          },
        },
        {
          start: {
            x: -316,
            y: -310,
          },
          end: {
            x: -311,
            y: 161,
          },
        },
      ],
    },
  ],
  '3bar': [
    {
      id: '3bar-pin-center-left-long',
      name: 'Pin Mitte: Links Lang',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: -80,
            y: 260,
          },
        },
        {
          start: {
            x: -85,
            y: 300,
          },
          end: {
            x: -85,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': -80,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-right-long',
      name: 'Pin Mitte: Rechts Lang',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: 80,
            y: 260,
          },
        },
        {
          start: {
            x: 85,
            y: 300,
          },
          end: {
            x: 85,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': -24,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-left-short',
      name: 'Pin Mitte: Links Kurz',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: -40,
            y: 260,
          },
        },
        {
          start: {
            x: -45,
            y: 300,
          },
          end: {
            x: -45,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 12,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-right-short',
      name: 'Pin Mitte: Rechts Kurz',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: 40,
            y: 260,
          },
        },
        {
          start: {
            x: 45,
            y: 300,
          },
          end: {
            x: 45,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': -12,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-flipover',
      name: 'Pin Mitte: Gerade/Kurbler',
      arrows: [
        {
          start: {
            x: 0,
            y: 300,
          },
          end: {
            x: 0,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 50,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-fake-left-long',
      name: 'Pin Mitte: Wechsler Links Lang',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: 80,
            y: 260,
          },
        },
        {
          start: {
            x: 80,
            y: 280,
          },
          end: {
            x: -80,
            y: 280,
          },
        },
        {
          start: {
            x: -85,
            y: 300,
          },
          end: {
            x: -85,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-fake-right-long',
      name: 'Pin Mitte: Wechsler Rechts Lang',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: -80,
            y: 260,
          },
        },
        {
          start: {
            x: -80,
            y: 280,
          },
          end: {
            x: 80,
            y: 280,
          },
        },
        {
          start: {
            x: 85,
            y: 300,
          },
          end: {
            x: 85,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-fake-left-3-4',
      name: 'Pin Mitte: Wechsler Links 3/4',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: 80,
            y: 260,
          },
        },
        {
          start: {
            x: 80,
            y: 280,
          },
          end: {
            x: -40,
            y: 280,
          },
        },
        {
          start: {
            x: -45,
            y: 300,
          },
          end: {
            x: -45,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-fake-right-3-4',
      name: 'Pin Mitte: Wechsler Rechts 3/4',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: -80,
            y: 260,
          },
        },
        {
          start: {
            x: -80,
            y: 280,
          },
          end: {
            x: 40,
            y: 280,
          },
        },
        {
          start: {
            x: 45,
            y: 300,
          },
          end: {
            x: 45,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-fake-left-middle',
      name: 'Pin Mitte: Wechsler Links Mitte',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: 80,
            y: 260,
          },
        },
        {
          start: {
            x: 80,
            y: 280,
          },
          end: {
            x: 0,
            y: 280,
          },
        },
        {
          start: {
            x: 0,
            y: 300,
          },
          end: {
            x: 0,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-fake-right-middle',
      name: 'Pin Mitte: Wechsler Rechts Mitte',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: -80,
            y: 260,
          },
        },
        {
          start: {
            x: -80,
            y: 280,
          },
          end: {
            x: 0,
            y: 280,
          },
        },
        {
          start: {
            x: 0,
            y: 300,
          },
          end: {
            x: 0,
            y: 480,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-nudge-left',
      name: 'Pin Mitte: Schräg/Stupser Links',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: -80,
            y: 260,
          },
        },
        {
          start: {
            x: -80,
            y: 300,
          },
          end: {
            x: -30,
            y: 380,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-center-nudge-right',
      name: 'Pin Mitte: Schräg/Stupser Rechts',
      arrows: [
        {
          start: {
            x: 0,
            y: 260,
          },
          end: {
            x: 80,
            y: 260,
          },
        },
        {
          start: {
            x: 80,
            y: 300,
          },
          end: {
            x: 30,
            y: 380,
          },
        },
      ],
      bars: {
        red: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
        blue: {
          '1bar': 0,
          '2bar': 0,
          '3bar': 0,
          '5bar': 0,
        },
      },
    },
    {
      id: '3bar-pin-left-3-4-long',
      name: 'Pin Links 3/4: Links Lang',
    },
    {
      id: '3bar-pin-left-3-4-right',
      name: 'Pin Links 3/4: Rechts',
    },
    {
      id: '3bar-pin-left-3-4-angled',
      name: 'Pin Links 3/4: Schräg',
    },
    {
      id: '3bar-pin-left-3-4-fake-right',
      name: 'Pin Links 3/4: Wechsler Rechts',
    },
    {
      id: '3bar-pin-left-3-4-left',
      name: 'Pin Links 3/4: Links',
    },
    {
      id: '3bar-pin-left-3-4-straight',
      name: 'Pin Links 3/4: Gerade',
    },
    {
      id: '3bar-pin-left-3-4-left-short',
      name: 'Pin Links 3/4: Links Kurz',
    },
    {
      id: '3bar-pin-left-3-4-fake-right-middle',
      name: 'Pin Links 3/4: Wechsler Rechts Mitte',
    },
    {
      id: '3bar-pin-left-3-4-fake-left-middle',
      name: 'Pin Links 3/4: Wechsler Links Mitte',
    },
    {
      id: '3bar-pin-left-3-4-fake-left-long',
      name: 'Pin Links 3/4: Wechsler Links Lang',
    },
    {
      id: '3bar-pin-right-long-long',
      name: 'Pin Rechtslang: Lang',
    },
    {
      id: '3bar-pin-right-long-middle',
      name: 'Pin Rechtslang: Mitte',
    },
    {
      id: '3bar-pin-right-long-straight',
      name: 'Pin Rechtslang: Gerade',
    },
    {
      id: '3bar-pin-right-long-right-3-4',
      name: 'Pin Rechtslang: Rechts 3/4',
    },
    {
      id: '3bar-pin-right-long-right-short',
      name: 'Pin Rechtslang: Rechts Kurz',
    },
    {
      id: '3bar-pin-right-long-angled-flipover',
      name: 'Pin Rechtslang: Schräger Kurbler',
    },
    {
      id: '3bar-pin-right-long-fake',
      name: 'Pin Rechtslang: Wechsler',
    },
    {
      id: '3bar-pin-right-long-drop-off-angled',
      name: 'Pin Rechtslang: Absetzer Schräg',
    },
    {
      id: '3bar-pin-right-long-drop-off-straight',
      name: 'Pin Rechtslang: Absetzer Gerade',
    },
    {
      id: '3bar-pin-right-long-cutback',
      name: 'Pin Rechtslang: Cutback',
    },
    {
      id: '3bar-pull-shot-long-spray',
      name: 'Zieher: Lang (Spray)',
    },
    {
      id: '3bar-pull-shot-middle',
      name: 'Zieher: Mitte',
    },
    {
      id: '3bar-pull-shot-straight',
      name: 'Zieher: Gerade',
    },
    {
      id: '3bar-pull-shot-drop-off-angled',
      name: 'Zieher: Absetzer Schräg',
    },
    {
      id: '3bar-pull-shot-angled',
      name: 'Zieher: Brush Schräg',
    },
    {
      id: '3bar-pull-shot-3-4-spray',
      name: 'Zieher: 3/4 (Spray)',
    },
    {
      id: '3bar-pull-shot-3-4',
      name: 'Zieher: 3/4',
    },
    {
      id: '3bar-pull-shot-short',
      name: 'Zieher: Kurz',
    },
    {
      id: '3bar-pull-shot-cutback-long',
      name: 'Zieher: Cutback Lang',
    },
    {
      id: '3bar-pull-shot-cutback-middle',
      name: 'Zieher: Cutback Mittel',
    },
    {
      id: '3bar-pull-shot-cutback-short',
      name: 'Zieher: Cutback Kurz',
    },
    {
      id: '3bar-pull-shot-long-straight',
      name: 'Zieher: Lang Gerade',
    },
    {
      id: '3bar-pull-shot-fake-back-pin',
      name: 'Zieher: Wechsler Backpin',
    },
    {
      id: '3bar-pull-shot-fake-push-kick',
      name: 'Zieher: Wechsler Pushkick',
    },
    {
      id: '3bar-snake-center-right',
      name: 'Jet Mitte: Rechts',
    },
    {
      id: '3bar-snake-center-left',
      name: 'Jet Mitte: Links',
    },
    {
      id: '3bar-snake-center-straight',
      name: 'Jet Mitte: Gerade',
    },
    {
      id: '3bar-snake-center-right-short',
      name: 'Jet Mitte: Rechts Kurz',
    },
    {
      id: '3bar-snake-center-left-short',
      name: 'Jet Mitte: Links Kurz',
    },
    {
      id: '3bar-snake-center-walking-right',
      name: 'Jet Mitte: Mitnehmer Rechts',
    },
    {
      id: '3bar-snake-center-walking-left',
      name: 'Jet Mitte: Mitnehmer Links',
    },
    {
      id: '3bar-snake-center-fake-right-short',
      name: 'Jet Mitte: Wechsler Rechts Kurz',
    },
    {
      id: '3bar-snake-center-fake-left-short',
      name: 'Jet Mitte: Wechsler Links Kurz',
    },
    {
      id: '3bar-snake-center-fake-right-3-4',
      name: 'Jet Mitte: Wechsler Rechts 3/4',
    },
    {
      id: '3bar-snake-center-fake-left-3-4',
      name: 'Jet Mitte: Wechsler Links 3/4',
    },
    {
      id: '3bar-snake-center-fake-right-middle',
      name: 'Jet Mitte: Wechsler Rechts Mitte',
    },
    {
      id: '3bar-snake-center-fake-left-middle',
      name: 'Jet Mitte: Wechsler Links Mitte',
    },
    {
      id: '3bar-snake-center-fake-right-long',
      name: 'Jet Mitte: Wechsler Rechts Lang',
    },
    {
      id: '3bar-snake-center-fake-left-long',
      name: 'Jet Mitte: Wechsler Links Lang',
    },
    {
      id: '3bar-snake-center-angled-right',
      name: 'Jet Mitte: Schräg Rechts',
    },
    {
      id: '3bar-snake-center-angled-left',
      name: 'Jet Mitte: Schräg Links',
    },
    {
      id: '3bar-snake-left-long-long',
      name: 'Jet Linkslang: Lang',
    },
    {
      id: '3bar-snake-left-long-straight',
      name: 'Jet Linkslang: Gerade',
    },
    {
      id: '3bar-snake-left-long-angled',
      name: 'Jet Linkslang: Schräg',
    },
    {
      id: '3bar-snake-left-long-short',
      name: 'Jet Linkslang: Kurz',
    },
    {
      id: '3bar-snake-left-long-middle',
      name: 'Jet Linkslang: Mitte',
    },
    {
      id: '3bar-snake-left-long-left-3-4',
      name: 'Jet Linkslang: Links 3/4',
    },
    {
      id: '3bar-snake-left-long-spray',
      name: 'Jet Linkslang: Spray',
    },
    {
      id: '3bar-snake-left-long-fake',
      name: 'Jet Linkslang: Wechsler',
    },
    {
      id: '3bar-snake-left-long-drop-off-angled',
      name: 'Jet Linkslang: Absetzer Schräg',
    },
    {
      id: '3bar-snake-left-long-drop-off-straight',
      name: 'Jet Linkslang: Absetzer Gerade',
    },
    {
      id: '3bar-snake-left-long-cutback',
      name: 'Jet Linkslang: Cutback',
    },
  ],
  '5bar': [
    {
      id: '5bar-chip-bottom',
      name: 'Kantenpass (unten)',
    },
    {
      id: '5bar-chip-top',
      name: 'Kantenpass (oben)',
    },
    {
      id: '5bar-stick-wall-bottom',
      name: 'Stickpass Bande (unten)',
    },
    {
      id: '5bar-stick-wall-top',
      name: 'Stickpass Bande (oben)',
    },
    {
      id: '5bar-stick-lane-bottom',
      name: 'Stickpass Feld (unten)',
    },
    {
      id: '5bar-stick-lane-top',
      name: 'Stickpass Feld (oben)',
    },
    {
      id: '5bar-brush-to-wall-bottom',
      name: 'Brush zur Bande (unten)',
    },
    {
      id: '5bar-brush-to-wall-top',
      name: 'Brush zur Bande (oben)',
    },
    {
      id: '5bar-brush-to-lane-bottom',
      name: 'Brush ins Feld (unten)',
    },
    {
      id: '5bar-brush-to-lane-top',
      name: 'Brush ins Feld (oben)',
    },
    {
      id: '5bar-brush-off-wall-to-wall-bottom',
      name: 'Abpraller Brush zur Bande (unten)',
    },
    {
      id: '5bar-brush-off-wall-to-wall-top',
      name: 'Abpraller Brush zur Bande (oben)',
    },
    {
      id: '5bar-brush-off-wall-to-lane-bottom',
      name: 'Abpraller Brush ins Feld (unten)',
    },
    {
      id: '5bar-brush-off-wall-to-lane-top',
      name: 'Abpraller Brush ins Feld (oben)',
    },
    {
      id: '5bar-stick-middle-man',
      name: 'Stickpass zur Mittelpuppe',
    },
    {
      id: '5bar-middle-shot',
      name: 'Schuss auf Tor',
    },
    {
      id: '5bar-bank-shot-bottom',
      name: 'Bande (unten)',
    },
    {
      id: '5bar-bank-shot-top',
      name: 'Bande (oben)',
    },
  ],
};
