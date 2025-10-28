import EventForm from "@/features/event/create/components/CreateEventForm";

import { use } from "react";
import { EventIdParam } from "../../myguests/[eventId]/page";

const EditEventPage = ({ params }: EventIdParam) => {
  const { eventId } = use(params);

  return (
    <div className="relative w-full min-h-screen bg-[#222222] flex justify-center items-center">
      <div className=" max-w-[90%] flex flex-col border border-[#efefef] rounded-xl border-[3px] p-8 shadow-lg shadow-white my-23">
        <div className="w-full flex justify-center items-center text-4xl py-4">
          <p style={{ fontFamily: "'Parisienne', cursive" }}>
            Edita tu invitacion
          </p>
        </div>
        <EventForm mode="edit" method="PATCH" url={`/api/event/${eventId}`} />
      </div>
    </div>
  );
};

export default EditEventPage;
