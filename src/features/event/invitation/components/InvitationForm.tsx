"use client";

import { CheckboxForm } from "@/components/form/CheckBoxForm";
import InputForm from "@/components/form/CustomInput";
import SelectForm from "@/components/form/SelectForm";
import { valibotResolver } from "@/components/form/valibotResolver";
import { guestSchema } from "@/schemas/guest.schema";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InferInput } from "valibot";

type FormValues = InferInput<typeof guestSchema>;

interface HasMenuOptionsProps {
  hasMenuOptions: boolean;
  eventId: string | null;
}

const dietaryOptions = [
  { value: "Gluten free", label: "Gluten free" },
  { value: "Sin azucar", label: "Sin azucar" },
  { value: "Vegano", label: "Vegano" },
  { value: "Vegetariano", label: "Vegetariano" },
  { value: "Ninguno", label: "Ninguna" },
];

const InvitationForm = ({ hasMenuOptions, eventId }: HasMenuOptionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [invitationCreated, setInvitationCreated] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: valibotResolver(guestSchema),
    defaultValues: {
      familyName: "",
      isAttending: false,
      menuOption: "",
      attendingCount: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventId }),
      });

      if (!res.ok) throw new Error("Solicitud fallida");
      setInvitationCreated(true);
      console.log("Invitado añadido");
    } catch (err) {
      console.error("Error en el fetch", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col max-w-50 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm
        fieldName="familyName"
        control={control}
        label="Nombre de la familia"
        type="text"
        placeHolder="Ingresa el nombre aqui"
        error={errors.familyName}
        labelClassName="flex justify-center items-center"
        inputClassName="border-b border-b-[1px] border-[#efefef] text-center mt-1 focus:outline-none focus:border-b-[3px] focus:border-b-[#EBCDF1]"
        containerClassName="mb-3"
      />

      {hasMenuOptions && (
        <SelectForm
          fieldName="menuOption"
          control={control}
          label="Menu especial"
          options={dietaryOptions}
          placeholder="Selecciona una opción"
          selectClassName="border-b border-b-[1px] border-[#efefef] text-center mb-3 mt-1 focus:outline-none focus:border-b-[3px] focus:border-b-[#EBCDF1] text-white focus:bg-[#efefef] focus:text-black"
          labelClassName="flex justify-center items-center"
          error={errors.menuOption}
        />
      )}

      <InputForm
        fieldName="attendingCount"
        control={control}
        label="¿Cuantos acompañantes irán?"
        type="number"
        placeHolder="Ingresa el numero aqui"
        error={errors.attendingCount}
        labelClassName="flex justify-center items-center"
        inputClassName="border-b border-b-[1px] border-[#efefef] text-center mb-3 mt-1 focus:outline-none focus:border-b-[3px] focus:border-b-[#EBCDF1]"
        maxValue={10}
      />

      <CheckboxForm
        fieldName="isAttending"
        control={control}
        label="¿Confirmas tu asistencia?"
      />

      <button
        className="submit-button border border-[2px] border-[#efefef] rounded-md text-[#323232] bg-[#efefef] mt-3"
        type="submit"
        style={{ fontFamily: "'Lora', serif" }}
        disabled={isLoading || invitationCreated}
      >
        {isLoading
          ? "Validando..."
          : invitationCreated
          ? "Enviado exitosamente"
          : "Enviar"}
      </button>
    </form>
  );
};

export default InvitationForm;
