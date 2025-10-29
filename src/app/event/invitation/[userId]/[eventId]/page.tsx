"use client";
import { InvitationPage } from "@/features/event/invitation/components/InvitationPage";
import { WeddingInvitation } from "@/features/event/invitation/defaultInvitationValues";
import { Event } from "@/core/services/event/model";
import { use, useEffect, useState } from "react";

interface Params {
  params: Promise<{
    userId: string;
    eventId: string;
  }>;
}

const DesignPage = ({ params }: Params) => {
  const { userId, eventId } = use(params);

  const [myEvent, setMyEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!userId || !eventId) {
      console.log("No se ha encontrado el usuario o el evento");
      return;
    }

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/event/${eventId}/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result: Event = await res.json();
        setMyEvent(result);
      } catch (err) {
        console.log("Error al recopilar la data", err);
      }
    };

    fetchEvent();
  }, [userId, eventId]);

  if (!myEvent) {
    return (
      <>
        <img
          className="w-full h-screen fixed -z-1 opacity-90"
          src="/skye.jpg"
          alt="skye-background"
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p>Cargando...</p>
        </div>
      </>
    );
  }

  const values: WeddingInvitation[] = [
    {
      title: "Itinerario",
      info: myEvent.itinerary,
    },
    {
      title: "Dress Code",
      info: myEvent.dressCode,
    },
    {
      title: "Ubicación",
      info: myEvent.location,
    },
  ];

  return (
    <InvitationPage
      wifeName={myEvent.wifeName}
      husbandName={myEvent.husbandName}
      menuOptions={myEvent.specialMenu}
      kidsAllowed={myEvent.kidsAllowed}
      eventDate={myEvent.eventDate}
      values={values}
      eventId={eventId}
    />
  );
};

export default DesignPage;
