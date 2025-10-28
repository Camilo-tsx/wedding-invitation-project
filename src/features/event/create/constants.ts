interface InputField {
  fieldName: string;
  label: string;
  type: "text" | "date" | "email" | "number";
  placeHolder: string;
  component: "input";
}

interface CheckboxField {
  fieldName: string;
  label: string;
  component: "checkbox";
}

type FormField = InputField | CheckboxField;

export const EVENT_FORM_FIELDS: FormField[] = [
  {
    fieldName: "husbandName",
    label: "Nombre de uno de los integrantes de la pareja",
    type: "text",
    placeHolder: "Ingresa el nombre aquí",
    component: "input",
  } as InputField,
  {
    fieldName: "wifeName",
    label: "Nombre del otro integrante de la pareja",
    type: "text",
    placeHolder: "Ingresa el nombre aquí",
    component: "input",
  } as InputField,
  {
    fieldName: "eventDate",
    label: "Fecha de la boda",
    type: "date",
    placeHolder: "Ingresa la fecha aquí",
    component: "input",
  } as InputField,
  {
    fieldName: "location",
    label: "Dirección de la boda",
    type: "text",
    placeHolder: "Ingresa la dirección aquí",
    component: "input",
  } as InputField,
  {
    fieldName: "itinerary",
    label: "Itinerario de la boda",
    type: "text",
    placeHolder: "Ingresa el itinerario aquí",
    component: "input",
  } as InputField,
  {
    fieldName: "dressCode",
    label: "Código de vestimenta",
    type: "text",
    placeHolder: "Ingresa el código de vestimenta aquí",
    component: "input",
  } as InputField,
  {
    fieldName: "kidsAllowed",
    label: "¿Los niños están permitidos en tu boda?",
    component: "checkbox",
  } as CheckboxField,
  {
    fieldName: "specialMenu",
    label: "¿Tendrás menú especial en tu boda?",
    component: "checkbox",
  } as CheckboxField,
];
