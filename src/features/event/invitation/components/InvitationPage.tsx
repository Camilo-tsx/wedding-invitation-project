import { WeddingInvitation } from "../defaultInvitationValues";
import { CountdownTimer } from "./CountDownTimer";
import InvitationForm from "./InvitationForm";
import { VisualLine } from "./VisualLine";

interface InvitationProps {
  eventDate: string;
  husbandName: string;
  wifeName: string;
  values: WeddingInvitation[];
  kidsAllowed: boolean;
  menuOptions: boolean;
  eventId: string | null;
}

export const InvitationPage = ({
  eventDate,
  husbandName,
  wifeName,
  values,
  kidsAllowed,
  menuOptions,
  eventId,
}: InvitationProps) => {
  return (
    <>
      <img
        className="w-full h-screen fixed -z-1 opacity-90 md:hidden"
        src="/skye.jpg"
        alt="skye-background"
      />

      <div className="hidden md:flex bg-[#090909] w-screen h-screen justify-center items-center">
        <div className="w-[95%] xl:w-[60%] h-auto flex flex-col justify-center items-center">
          <div
            style={{ fontFamily: "'Lora', serif" }}
            className="h-[250px]  px-5 max-w-[80%] w-[80%] border-[3px] border-[#efefef] rounded-xl bg-transparent shadow-lg shadow-white flex flex-col items-center justify-center"
          >
            <h3 className="text-4xl pb-4">¡Ups!</h3>
            <p className="text-md text-center">
              Estos diseños estan hechos para ser vistos desde tu celular
            </p>
            <p className="text-md text-center">
              prueba entrando desde uno para ver el diseño correctamente
            </p>
          </div>
        </div>
      </div>
      <div className="h-auto w-full a-center justify-center flex md:hidden">
        <div className="mt-25 flex flex-col items-center w-full">
          <p
            style={{ fontFamily: "'Parisienne', cursive" }}
            className="text-7xl text-[#efefef]"
          >
            Nos
          </p>
          <p
            style={{ fontFamily: "'Parisienne', cursive" }}
            className=" text-7xl text-[#efefef]"
          >
            Casamos
          </p>
          <VisualLine firstItem={husbandName} secondItem={wifeName} />

          <CountdownTimer title="Faltan" targetDate={new Date(eventDate)} />
          <VisualLine firstItem="Camilo" secondItem="Leticia" />

          {values.map((v, i) => (
            <div
              key={i}
              className="w-full h-auto flex flex-col justify-center items-center"
            >
              <div className="h-auto py-15 px-5 max-w-[80%] w-[80%] border-[3px] border-[#efefef] rounded-xl bg-transparent shadow-lg shadow-white flex flex-col items-center">
                <h3
                  style={{ fontFamily: "'Parisienne', cursive" }}
                  className="mb-6 text-4xl"
                >
                  {v.title}
                </h3>
                <p
                  className="text-md text-center"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {v.info}
                </p>
              </div>

              <VisualLine firstItem="Camilo" secondItem="Leticia" />
            </div>
          ))}

          <h3
            style={{ fontFamily: "'Lora', serif" }}
            className="text-2xl text-center py-10"
          >
            {kidsAllowed ? "Niños permitidos" : "No se admiten niños"}
          </h3>
          <VisualLine firstItem="Camilo" secondItem="Leticia" />

          <h3
            style={{ fontFamily: "'Parisienne', cursive" }}
            className="text-4xl text-center mt-10 pb-5"
          >
            Confirma tu asistencia
          </h3>
          <div className="relative bg-[#323232]/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg w-85 min-h-[300px] flex flex-col justify-center items-center mb-[100px]">
            <InvitationForm hasMenuOptions={menuOptions} eventId={eventId} />
          </div>
        </div>
      </div>
    </>
  );
};
