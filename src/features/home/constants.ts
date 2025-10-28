interface FeatureItem {
  title: string;
  lines: string[];
}

export const overviewFeatures: FeatureItem[] = [
  { title: "", lines: [] },
  { title: "Confirmación", lines: ["Confirmaciónes de asistencia", "online"] },
  {
    title: "Panel de administración",
    lines: [
      "Lleva un control de tus",
      "invitados",
      "con nuestro panel de administración",
    ],
  },
  {
    title: "Invitación simple",
    lines: ["Comparte tu invitación", "sin complicaciones"],
  },
  {
    title: "Itinerario",
    lines: ["Organiza el itinerario", "de tu boda", "y mantenlo actualizado"],
  },
  {
    title: "Invitados y acompañantes",
    lines: [
      "Gestiona la lista de invitados",
      "y sus acompañantes",
      "facilmente",
    ],
  },
  { title: "Dresscode", lines: ["Info de vestimenta para tus", "invitados"] },
  { title: "Menu especial", lines: ["Agrega menu especial para tu", "boda"] },
  { title: "", lines: [] },
];
