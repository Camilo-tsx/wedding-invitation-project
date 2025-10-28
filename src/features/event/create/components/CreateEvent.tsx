import EventForm from "./CreateEventForm";

export const CreateEvent = () => {
  return (
    <div className=" max-w-[90%] flex flex-col border border-[#efefef] rounded-xl border-[3px] p-8 shadow-lg shadow-white my-23">
      <div className="w-full flex justify-center items-center text-4xl py-4">
        <p style={{ fontFamily: "'Parisienne', cursive" }}>
          Crea tu invitación
        </p>
      </div>
      <EventForm mode="create" method="POST" url="/api/event" />
    </div>
  );
};
