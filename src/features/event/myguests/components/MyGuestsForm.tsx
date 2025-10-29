"use client";
import InputForm from "@/components/form/CustomInput";
import { valibotResolver } from "@/components/form/valibotResolver";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InferInput } from "valibot";
import { guestFieldsPartial } from "@/schemas/guest.schema";
import { Guest } from "@/modules/guest/model";

type FormValues = InferInput<typeof guestFieldsPartial>;

interface EditedGuestFormProps {
  menuOptionPrevValue: string | undefined;
  attendingCountPrevValue: string | undefined;
  cancelEdit: () => void;
  eventId: string;
  id: string;
  setMyGuests: Dispatch<SetStateAction<Guest[]>>;
}

const EditedGuestForm = ({
  menuOptionPrevValue,
  attendingCountPrevValue,
  cancelEdit,
  eventId,
  id,
  setMyGuests,
}: EditedGuestFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: valibotResolver(guestFieldsPartial),
    defaultValues: {
      menuOption: menuOptionPrevValue,
      attendingCount: attendingCountPrevValue?.toString(),
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Se esta llamando el submit?");
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/guest/${id}/${eventId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok)
          return console.log("No se pudo editar el usuario", res.status);

        const updatedGuest: Guest = await res.json();
        setIsSuccess(true);

        // Actualizamos myGuests reemplazando solo el invitado editado
        setMyGuests((prev) =>
          prev.map((guest) =>
            guest.id === updatedGuest.id ? updatedGuest : guest
          )
        );

        console.log("usuario editado");
      } catch (err) {
        console.error("Error en el fetch", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };
  return (
    <form
      className="flex flex-col text-[#efefef] text-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <div style={{ fontFamily: "Lora, serif" }} className="flex flex-row">
          <span className="font-medium">Menú especial:</span>{" "}
          <InputForm
            fieldName="menuOption"
            control={control}
            label=""
            type="text"
            placeHolder=""
            error={errors["menuOption" as keyof FormValues]}
            labelClassName="text-lg"
            inputClassName="bg-transparent text-black px-1 border-b-[1px] mx-1"
          />
        </div>
        <div style={{ fontFamily: "Lora, serif" }} className="flex flex-row">
          <span className="font-medium">Acompañantes:</span>
          <InputForm
            fieldName="attendingCount"
            control={control}
            label=""
            type="number"
            placeHolder=""
            error={errors["attendingCount" as keyof FormValues]}
            labelClassName="text-lg"
            inputClassName="bg-transparent text-black px-1 border-b-[1px] mx-1"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="px-2.5 py-1.5 text-xs bg-[#323232] hover:bg-gray-600 text-white rounded-lg transition-all duration-200 cursor-pointer"
            type="submit"
            style={{ fontFamily: "'Lora', serif" }}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? "Validando..." : isSuccess ? "Editado" : "Guardar"}
          </button>
          <button
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-transparent hover:bg-red-700 text-[#AD1717] hover:text-white border-[1px] border-[#AD1717] rounded-lg transition-all duration-200 cursor-pointer"
            style={{ fontFamily: "'Lora', serif" }}
            disabled={isLoading}
            onClick={cancelEdit}
          >
            Volver
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditedGuestForm;
