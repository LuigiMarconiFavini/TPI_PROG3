export const deportes = [
  { value: "futbol", label: "Fútbol" },
  { value: "padel", label: "Pádel" },
];

export const tiposPorDeporte = {
  futbol: [
    { value: "f5", label: "Fútbol 5" },
    { value: "f7", label: "Fútbol 7" },
    { value: "f8", label: "Fútbol 8" },
    { value: "f9", label: "Fútbol 9" },
  ],
  padel: [
    { value: "cubiertas", label: "Cubiertas" },
    { value: "panoramicas", label: "Panorámicas" },
    { value: "cesped", label: "Césped sintético" },
    { value: "cielo", label: "Cielo abierto" },
  ],
};

export const horarios = [
  "9:00hs",
  "10:00hs",
  "11:00hs",
  "12:00hs",
  "13:00hs",
  "14:00hs",
  "15:00hs",
  "16:00hs",
  "17:00hs",
  "18:00hs",
  "19:00hs",
  "20:00hs",
  "21:00hs",
  "22:00hs",
  "23:00hs",
];

export const canchas = [
  {
    id: 1,
    nombre: "Fútbol 5 La Esquina",
    deporte: "futbol",
    tipo: "f5",
    direccion: "Av. San Martín 1234",
    precio: 5000,
    horarios: ["18:00hs", "19:00hs", "20:00hs"],
    imagen:
      "https://img.a.transfermarkt.technology/portrait/header/553469-1731009174.jpg?lm=1",
  },
  {
    id: 2,
    nombre: "Complejo Golazo",
    deporte: "futbol",
    tipo: "f7",
    direccion: "Bv. Oroño 2345",
    precio: 7000,
    horarios: ["17:00hs", "18:00hs", "19:00hs"],
    imagen:
      "https://rosariocentral.com/wp-content/uploads/2023/02/CAMPAZ_GRANDE.png",
  },
  {
    id: 3,
    nombre: "Padel Center Norte",
    deporte: "padel",
    tipo: "cubiertas",
    direccion: "Calle Belgrano 456",
    precio: 4000,
    horarios: ["17:00hs", "18:00hs", "19:00hs"],
    imagen:
      "https://img.bundesliga.com/tachyon/sites/2/2019/07/che_epl_ampadu_close_1920.jpg?crop=0px,0px,1920px,1080px",
  },
  {
    id: 4,
    nombre: "Padel Club Sur",
    deporte: "padel",
    tipo: "cesped",
    direccion: "Av. Pellegrini 789",
    precio: 3500,
    horarios: ["16:00hs", "17:00hs", "18:00hs"],
    imagen:
      "https://marcaenzona.com/news/uploads/images/image_750x_67056451efdef.jpg",
  },
];

export const promotionsMock = {
  totalBookings: 5, // reservas hechas por el usuario
  rewardsCycle: 5,  // cada cuántas reservas hay recompensa
  availableRewards: [
    "10% de descuento en tu próxima reserva",
    "1 bebida gratis post-partido",
    "20% de descuento en una cancha techada",
  ],
  redeemedRewards: [], // historial de recompensas canjeadas
};

export const userMock = {
  id: 1,
  firstName: "Luigi",
  lastName: "Marconi Favini",
  email: "luigimarconifavini@mail.com",
  phone: "+54 341 610 6235",
  role: "Usuario",
  photo: "https://media.cnn.com/api/v1/images/stellar/prod/cnne-212344-monkey-selfie.jpeg?c=16x9&q=h_653,w_1160,c_fill/f_avif",
};