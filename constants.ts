export interface MusicQuestion {
  id: string;
  sentence: string;
  options: string[];
  correctIndex: number;
  translation: string;
  explanation: string;
}

export const SENSES_QUESTIONS: MusicQuestion[] = [
  {
    id: '1',
    sentence: "Yo _______ música rock en mi habitación.",
    options: ["oigo", "escucho", "veo", "miro"],
    correctIndex: 1,
    translation: "Ես ռոք երաժշտություն եմ լսում իմ սենյակում:",
    explanation: "'Escuchar' օգտագործվում է, երբ ուշադիր լսում ենք ինչ-որ բան (կամավոր):"
  },
  {
    id: '2',
    sentence: "¿_______ tú ese ruido extraño ahora?",
    options: ["escuchas", "miras", "oyes", "ves"],
    correctIndex: 2,
    translation: "Դու լսու՞մ ես այդ տարօրինակ աղմուկը հիմա:",
    explanation: "'Oír' (oyes) օգտագործվում է ֆիզիկական լսողության համար:"
  },
  {
    id: '3',
    sentence: "Yo _______ las estrellas en el cielo.",
    options: ["miro", "oigo", "veo", "escucho"],
    correctIndex: 0,
    translation: "Ես նայում եմ երկնքի աստղերին:",
    explanation: "'Mirar' - հայացքը կենտրոնացնել ինչ-որ բանի վրա:"
  },
  {
    id: '4',
    sentence: "Ahora mismo _______ a tu hermano en la calle.",
    options: ["miro", "veo", "escucho", "oigo"],
    correctIndex: 1,
    translation: "Հենց հիմա ես տեսնում եմ քո եղբորը փողոցում:",
    explanation: "'Ver' օգտագործվում է ֆիզիկական տեսողության համար (ինչ-որ մեկին տեսնել):"
  },
  {
    id: '5',
    sentence: "¿_______ tú el ruido del tráfico?",
    options: ["Escuchas", "Oyes", "Miras", "Ves"],
    correctIndex: 1,
    translation: "Լսու՞մ ես փողոցի երթևեկության աղմուկը:",
    explanation: "'Oír' (oyes) - ֆիզիկական ձայն լսելը:"
  },
  {
    id: '6',
    sentence: "Siempre _______ con atención al profesor.",
    options: ["oigo", "miro", "escucho", "veo"],
    correctIndex: 2,
    translation: "Ես միշտ ուշադրությամբ լսում եմ ուսուցչին:",
    explanation: "'Escuchar' նշանակում է կանխամտածված և ուշադիր լսել:"
  },
  {
    id: '7',
    sentence: "Mi abuela no _______ nada sin sus gafas.",
    options: ["ve", "mira", "oye", "escucha"],
    correctIndex: 0,
    translation: "Տատիկս ոչինչ չի տեսնում առանց իր ակնոցների:",
    explanation: "'Ver' տեսողական ֆունկցիան է:"
  },
  {
    id: '8',
    sentence: "Si _______ este cuadro, verás muchos detalles.",
    options: ["ves", "oyes", "miras", "escuchas"],
    correctIndex: 2,
    translation: "Եթե նայես (զննես) այս նկարին, շատ մանրամասներ կտեսնես:",
    explanation: "'Mirar' - ուշադրություն դարձնել տեսողական օբյեկտին:"
  },
  {
    id: '9',
    sentence: "Ella _______ los pájaros cantar por la mañana.",
    options: ["oye", "escucha", "mira", "ve"],
    correctIndex: 0,
    translation: "Նա լսում է թռչունների երգը առավոտյան:",
    explanation: "Երբ ձայնը հասնում է ականջին առանց ջանքի - 'Oír' (oye):"
  },
  {
    id: '10',
    sentence: "Nosotros _______ la televisión todos los días.",
    options: ["miramos", "vemos", "escuchamos", "oímos"],
    correctIndex: 1,
    translation: "Մենք ամեն օր հեռուստացույց ենք դիտում:",
    explanation: "Հեռուստացույց դիտելու համար սովորաբար օգտագործվում է 'Ver':"
  },
  {
    id: '11',
    sentence: "Pedro _______ por la ventana mientras llueve.",
    options: ["ve", "mira", "oye", "escucha"],
    correctIndex: 1,
    translation: "Պեդրոն նայում է պատուհանից դուրս, երբ անձրև է գալիս:",
    explanation: "'Mirar' - հայացքը ուղղել ինչ-որ ուղղությամբ:"
  },
  {
    id: '12',
    sentence: "¿_______ tú las noticias en la radio?",
    options: ["Oyes", "Escuchas", "Ves", "Miras"],
    correctIndex: 1,
    translation: "Լսու՞մ ես լուրերը ռադիոյով:",
    explanation: "'Escuchar' - տեղեկատվություն ստանալու համար ուշադիր լսել:"
  }
];

export const PLAYER_CONFIG = {
  GOR: {
    name: 'Գոռ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    color: '#3b82f6'
  },
  GAYANE: {
    name: 'Գայանե',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    color: '#ec4899'
  }
};

export const MUSIC_ASSETS = {
  bg: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
  guitar: 'https://cdn-icons-png.flaticon.com/512/3063/3063802.png',
  note: 'https://cdn-icons-png.flaticon.com/512/2995/2995101.png'
};
