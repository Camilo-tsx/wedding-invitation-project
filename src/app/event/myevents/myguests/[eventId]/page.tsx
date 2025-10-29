"use client";
import EditedGuestForm from "@/features/event/myguests/components/MyGuestsForm";
import { use, useEffect, useState } from "react";
import { CheckIcon } from "../../../../../../public/icons/CheckIcon";
import { XIcon } from "../../../../../../public/icons/XIcon";
import { UsersIcon } from "../../../../../../public/icons/UsersIcon";
import { InfoIcon } from "../../../../../../public/icons/InfoIcon";
import { EditIcon } from "../../../../../../public/icons/EditIcon";
import { TrashIcon } from "../../../../../../public/icons/TrashIcon";
import { SearchIcon } from "../../../../../../public/icons/SearchIcon";
import { Guest } from "@/core/services/guest/model";

export interface EventIdParam {
  params: Promise<{ eventId: string }>;
}

export const MyGuestsPage = ({ params }: EventIdParam) => {
  const { eventId } = use(params);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState<{
    familyName?: string;
    menuOption?: string;
    quantity?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGuestId, setExpandedGuestId] = useState<string | null>(null);
  const [guestIsDeleting, setGuestIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[0-9]/g, "")
      .trim()
      .toLowerCase();

  // Filtrado directo - eficiente para datasets pequeños
  let filteredGuests = guests.filter((g) => {
    if (
      searchQuery.familyName &&
      !normalize(g.familyName).includes(normalize(searchQuery.familyName))
    ) {
      return false;
    }

    // Si está en "Todos", no filtramos
    if (
      searchQuery.menuOption &&
      searchQuery.menuOption !== "Todos" &&
      g.menuOption !== searchQuery.menuOption
    ) {
      return false;
    }

    return true;
  });

  // Ordenar por cantidad de acompañantes
  if (searchQuery.quantity === "mayor") {
    filteredGuests = [...filteredGuests].sort(
      (a, b) => Number(b.attendingCount) - Number(a.attendingCount)
    );
  }

  if (searchQuery.quantity === "menor") {
    filteredGuests = [...filteredGuests].sort(
      (a, b) => Number(a.attendingCount) - Number(b.attendingCount)
    );
  }

  // Fetch de invitados
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const res = await fetch(`/api/guest/id/${eventId}`);
        if (!res.ok) throw new Error("Error en el fetch");
        const result = await res.json();
        setGuests(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("Error cargando invitados:", err);
        setGuests([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuests();
  }, [eventId]);

  const handleClickInfo = (guestId: string) => {
    setExpandedGuestId((prev) => (prev === guestId ? null : guestId));
  };

  const handleDelete = async (guestId: string) => {
    try {
      setGuestIsDeleting(true);
      const res = await fetch(`/api/guest/${guestId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log("No se pudo eliminar el guest");
        return;
      }

      console.log("usuario eliminado con exito");
      // Solo actualizar un estado
      setGuests((prev) => prev.filter((g) => g.id !== guestId));
    } catch (err) {
      console.error("Error en el fetch", err);
    } finally {
      setGuestIsDeleting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler del input de búsqueda
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = form.search.value;
    setSearchQuery((prev) => ({
      ...prev,
      familyName: query,
    }));
  };

  // Stats calculadas sobre los invitados filtrados
  const confirmedGuests = filteredGuests.filter((g) => g.isAttending).length;
  const pendingGuests = filteredGuests.filter((g) => !g.isAttending).length;
  const totalInvitados = filteredGuests.reduce(
    (acc, g) => acc + Number(g.attendingCount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-transparent">
      <img
        src="/sessionbg.png"
        alt="comet"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 px-4 py-6 mt-20">
        <h1
          className="text-2xl md:text-5xl font-light text-center text-[#efefef] tracking-wide mb-6"
          style={{ fontFamily: "Parisienne, cursive" }}
        >
          Panel de Invitados
        </h1>

        {/* Stats Cards */}
        {!isLoading && guests.length > 0 && (
          <div className="flex flex-col justify-center items-center gap-3 mb-8 w-full">
            <StatCard
              icon={<CheckIcon className="w-full h-full text-black" />}
              count={confirmedGuests}
              label="Asisten"
            />
            <StatCard
              icon={<XIcon className="w-full h-full text-black" />}
              count={pendingGuests}
              label="No asisten"
            />
            <StatCard
              icon={<UsersIcon className="w-full h-full text-black" />}
              count={totalInvitados}
              label="Total"
            />

            <div className="w-full lg:max-w-4xl flex flex-col items-center items-start gap-2">
              <p className="text-white text-sm p-0 m0">Organizar por:</p>

              <select
                name="menuOption"
                className="border-b-[2px] border-b-[#efefef]  px-2 py-1 text-sm focus:bg-[#efefef] focus:text-black"
                defaultValue=""
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Menú especial
                </option>
                <option value="Todos">Todos</option>
                <option value="Ninguno">Ninguno</option>
                <option value="Gluten free">Gluten free</option>
                <option value="Vegetariano">Vegetariano</option>
                <option value="Vegano">Vegano</option>
                <option value="Sin azucar">Sin azúcar</option>
              </select>

              <select
                name="quantity"
                className="border-b-[2px] border-b-[#efefef]  px-2 py-1 text-sm focus:bg-[#efefef] focus:text-black"
                defaultValue=""
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Cantidad
                </option>
                <option value="mayor">Mayor cantidad de acompañantes</option>
                <option value="menor">Menor cantidad de acompañantes</option>
              </select>
            </div>

            <div className="w-full lg:max-w-4xl">
              <form
                className="flex border-[2px] border-white rounded-lg p-1"
                onSubmit={handleSearch}
              >
                <button type="submit">
                  <SearchIcon />
                </button>
                <input
                  name="search"
                  type="text"
                  className="w-full px-2 focus:border-none focus:outline-none focus:ring-0 text-sm"
                  placeholder="Nombre de la familia que quieras buscar"
                />
              </form>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-black mb-4"></div>
            <p
              className="text-[#efefef] text-base xl:text-xl font-light"
              style={{ fontFamily: "Lora, serif" }}
            >
              Buscando a tus invitados...
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {filteredGuests.length === 0 ? (
              <div className="text-center py-16 px-4">
                <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2
                  className="text-xl text-black font-light mb-2"
                  style={{ fontFamily: "Parisienne, cursive" }}
                >
                  {guests.length === 0
                    ? "No se encontraron invitados"
                    : "Sin resultados"}
                </h2>
                <p
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {guests.length === 0
                    ? "Los invitados aparecerán aquí una vez que se registren"
                    : "Intenta con otro término de búsqueda"}
                </p>
              </div>
            ) : (
              <>
                {/* Header tabla */}
                <div
                  className="bg-[#323232] px-6 py-4 text-white text-sm lg:text-xl font-light"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  <div className="flex justify-between gap-4 w-full">
                    <div className="flex flex-col gap-1">
                      <span>Nombre de la</span>
                      <span>Familia</span>
                    </div>
                    <div className="flex gap-1 flex-col text-center">
                      <span>Confirma</span>
                      <span>Asistencia</span>
                    </div>
                  </div>
                </div>

                {/* Lista invitados */}
                <div className="bg-[#efefef]">
                  {filteredGuests.map((guest, index) => {
                    const expanded = expandedGuestId === guest.id;
                    const isLast = index === filteredGuests.length - 1;

                    return (
                      <div
                        key={guest.id}
                        className="flex flex-col w-full justify-center items-center"
                      >
                        <div
                          className={`px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors w-90 md:w-full ${
                            !isLast ? "border-b-[1px] border-[#323232]" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center gap-3 px-2">
                            <div className="flex items-center gap-3">
                              <span
                                className="text-base lg:text-xl md:text-lg text-black font-normal"
                                style={{ fontFamily: "Lora, serif" }}
                              >
                                {guest.familyName}
                              </span>
                              <button
                                onClick={() => handleClickInfo(guest.id)}
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all cursor-pointer"
                              >
                                <InfoIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                                <span
                                  className="sm:inline lg:text-sm"
                                  style={{ fontFamily: "Lora, serif" }}
                                >
                                  {expanded ? "Menos info" : "Mas info"}
                                </span>
                              </button>
                            </div>

                            <div className="flex items-center">
                              <div
                                className={`w-6 h-6 md:w-8 h-8 rounded-full flex items-center justify-center ${
                                  guest.isAttending
                                    ? "bg-[#323232]"
                                    : "bg-[#E65A5A]"
                                }`}
                              >
                                {guest.isAttending ? (
                                  <CheckIcon className="w-3 h-3 text-white md:w-5 h-5" />
                                ) : (
                                  <XIcon className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Info expandida */}
                          {expanded && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              {isEditing ? (
                                <EditedGuestForm
                                  attendingCountPrevValue={guest.attendingCount}
                                  menuOptionPrevValue={guest.menuOption}
                                  cancelEdit={() => setIsEditing(false)}
                                  eventId={eventId}
                                  id={guest.id}
                                  setMyGuests={setGuests}
                                />
                              ) : (
                                <div className="space-y-2 text-sm text-gray-700 mb-4">
                                  <p style={{ fontFamily: "Lora, serif" }}>
                                    <span className="font-medium">
                                      Menú especial:
                                    </span>{" "}
                                    {guest.menuOption || "Ninguno"}
                                  </p>
                                  <p style={{ fontFamily: "Lora, serif" }}>
                                    <span className="font-medium">
                                      Acompañantes:
                                    </span>{" "}
                                    {guest.attendingCount}
                                  </p>
                                </div>
                              )}

                              {!isEditing && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-[#323232] hover:bg-gray-600 text-white rounded-lg transition-all duration-200 cursor-pointer"
                                    style={{ fontFamily: "Lora, serif" }}
                                  >
                                    <EditIcon className="w-3 h-3" />
                                    Editar
                                  </button>
                                  <button
                                    onClick={() => handleDelete(guest.id)}
                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-transparent hover:bg-red-700 text-[#AD1717] hover:text-white border-[1px] border-[#AD1717] rounded-lg transition-all duration-200 cursor-pointer"
                                    style={{ fontFamily: "Lora, serif" }}
                                    disabled={guestIsDeleting}
                                  >
                                    <TrashIcon className="w-3 h-3" />
                                    {guestIsDeleting
                                      ? "Eliminando..."
                                      : "Eliminar"}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  count,
  label,
}: {
  icon: React.ReactNode;
  count: number;
  label: string;
}) => {
  return (
    <div className="w-full h-[50px] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-[#efefef] border rounded-lg p-4 shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-2 text-black">
        <div className="w-5 h-5">{icon}</div>
        <span className="text-lg md:text-xl lg:text-2xl font-light">
          {count}
        </span>
        <span
          className="text-xs md:text-sm font-normal text-gray-800"
          style={{ fontFamily: "Lora, serif" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default MyGuestsPage;
