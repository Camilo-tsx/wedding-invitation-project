"use client";
import { Event } from "@/core/services/event/model";
import { useEffect, useState } from "react";
import "../styles/myevents.css";
import Link from "next/link";
import { PlusIcon } from "../../../../../public/icons/PlusIcon";

export const MyEvents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const myEventsFetch = async () => {
      try {
        const res = await fetch("/api/event", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          signal: controller.signal,
        });

        if (!res.ok) {
          if (isMounted) setIsLoading(false);
          return;
        }

        const result = await res.json();

        const events: Event[] = result.events;
        const userId: string = result.userId;

        if (isMounted) {
          setMyEvents(events);
          setUserId(userId);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") console.error(err);
        if (isMounted) setIsLoading(false);
      }
    };

    myEventsFetch();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const deleteInvitation = async (userId: string, eventId: string) => {
    try {
      const res = await fetch(`/api/event/${eventId}/${userId}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) {
        alert("Hubo un error al eliminar el evento, prueba mas tarde");
        return;
      }

      const updatedEvents = myEvents.filter((e) => eventId !== e.id);
      setMyEvents(updatedEvents);
    } catch (err) {
      throw new Error("No se pudo eliminar la invitación");
    }
  };

  return (
    <div className="w-full items-center flex flex-col">
      <div className="w-full flex justify-center items-center text-5xl lg:text-7xl py-1 mt-25">
        <p style={{ fontFamily: "'Parisienne', cursive" }}>Mis Eventos</p>
      </div>
      <div className=" max-w-130 lg:max-w-250 w-full md:w-130 lg:w-150 flex flex-col p-8 ">
        <div className="h-auto">
          {myEvents.length === 0 ? (
            <div className="text-center">
              {isLoading ? (
                <p className="lg:text-2xl">Buscando eventos...</p>
              ) : (
                <div>
                  <p>No se encontraron eventos relacionados con tu usuario</p>
                  <Link href="/event/create">
                    <button className="cursor-pointer border border-[2px] border-[#efefef] rounded-lg text-[#323232] bg-[#efefef] w-full p-2 mt-4">
                      Crear un evento
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center w-full  text-white text-2xl h-auto">
              {myEvents.map((ev, i) => (
                <div
                  key={i}
                  className="text-center py-3 w-full event-card py-10 flex flex-col rounded-2xl"
                >
                  <div className="lg:text-4xl">
                    <p style={{ fontFamily: "'Parisienne', cursive" }}>
                      {ev.husbandName} & {ev.wifeName}
                    </p>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Lora', serif",
                      fontStyle: "italic",
                    }}
                    className="text-base lg:text-xl flex flex-col gap-2 mt-2 event-card-container w-full justify-center items-center"
                  >
                    <Link href={`/event/invitation/${userId}/${ev.id}`}>
                      <button className="transition-colors duration-200 hover:bg-[#efefef] hover:text-[#323232] cursor-pointer">
                        Ir a la invitación
                      </button>
                    </Link>
                    <Link href={`/event/myevents/myguests/${ev.id}/`}>
                      <button className="transition-colors duration-200 hover:bg-[#efefef] hover:text-[#323232] cursor-pointer">
                        Panel de invitados
                      </button>
                    </Link>
                    <Link href={`/event/myevents/edit/${ev.id}`}>
                      <button className="transition-colors duration-200 hover:bg-[#efefef] hover:text-[#323232] cursor-pointer">
                        Editar invitación
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteInvitation(userId!, ev.id)}
                      className="transition-colors duration-200 hover:bg-[#efefef] hover:text-[#323232] cursor-pointer"
                    >
                      Eliminar invitación
                    </button>
                  </div>
                </div>
              ))}
              <div className="w-full flex items-center justify-center text-center py-7 event-card mb-2 rounded-xl">
                <Link href="/event/create">
                  <PlusIcon className="size-13" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
