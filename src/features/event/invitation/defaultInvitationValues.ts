export interface WeddingInvitation {
  title: string;
  info: string;
}

// Constante
export const DEFAULT_INVITATION_VALUES: WeddingInvitation[] = [
  {
    title: "Itinerario",
    info: "Ceremonia a las 17:00, cena a las 20:00, fiesta desde las 22:00",
  },

  {
    title: "Dress Code",
    info: "Formal / Elegante",
  },
  {
    title: "Ubicación",
    info: "Hotel Sofitel, Montevideo, Uruguay",
  },
];

export const BOOLEANS_DEFAULT_INVITATION_VALUES = {
  kidsAllowed: false,
  specialMenu: true,
};
