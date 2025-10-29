"use client";
import { CheckboxForm } from "@/shared/components/form/CheckBoxForm";
import InputForm from "@/shared/components/form/CustomInput";
import { valibotResolver } from "@/shared/components/form/valibotResolver";
import { eventSchema, validatePartialEvent } from "@/schemas/event.schema";
import { useState } from "react";
import { SubmitHandler, useForm, FieldError } from "react-hook-form";
import { InferInput } from "valibot";
import { EVENT_FORM_FIELDS } from "../constants";
import Link from "next/link";

// Tipo que combina los inputs posibles
type EventFormValues =
  | InferInput<typeof eventSchema>
  | InferInput<typeof validatePartialEvent>;

type EventMode = "create" | "edit";

interface EventFormProps {
  mode: EventMode;
  method: "POST" | "PUT" | "PATCH";
  url: string;
}

const EventForm = ({ mode, method, url }: EventFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const schema = mode === "create" ? eventSchema : validatePartialEvent;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EventFormValues>({
    resolver: valibotResolver(schema),
    defaultValues: {
      husbandName: undefined,
      wifeName: undefined,
      eventDate: undefined,
      location: undefined,
      itinerary: undefined,
      dressCode: undefined,
      kidsAllowed: false,
      specialMenu: false,
    },
  });

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    setIsLoading(true);

    const fetchData = async () => {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.status === 403) {
        if (result.error && result.field) {
          setError(result.field, { type: "server", message: result.error });
        } else {
          setError("root", {
            type: "server",
            message: result.error || "Error inesperado",
          });
        }
        setIsLoading(false);
        return;
      }

      if (res.status === 401) {
        if (result.error && result.field) {
          setError(result.field, { type: "server", message: result.error });
        } else {
          setError("root", {
            type: "server",
            message: result.error || "Error inesperado",
          });
        }
        setIsLoading(false);
        return;
      }
      setIsSuccess(true);
      setIsLoading(false);
    };

    fetchData();
  };

  const getFieldError = (fieldName: string): FieldError | undefined => {
    return errors[fieldName as keyof typeof errors] as FieldError | undefined;
  };

  return (
    <form
      className="flex flex-col text-[#efefef] text-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      {EVENT_FORM_FIELDS.map((field, i) => {
        if (field.component === "input") {
          return (
            <InputForm
              key={i}
              fieldName={field.fieldName}
              control={control}
              label={field.label}
              type={field.type}
              placeHolder={field.placeHolder}
              error={getFieldError(field.fieldName)}
              labelClassName="text-lg"
              inputClassName="border-b-[2px] py-2 focus:border-[#F3C6FB] focus:outline-none"
              containerClassName="mb-4"
            />
          );
        }

        if (field.component === "checkbox") {
          return (
            <CheckboxForm
              key={i}
              fieldName={field.fieldName}
              control={control}
              label={field.label}
              error={getFieldError(field.fieldName)}
            />
          );
        }
      })}

      <div className="w-full my-8 flex flex-col justify-center items-center">
        <button
          className={`submit-button border border-[2px] border-[#efefef] rounded-lg w-full p-2 text-[#323232] cursor-pointer 
      ${
        isSuccess
          ? "bg-[#323232] transition-colors duration-500 text-[#efefef]"
          : "bg-[#efefef]"
      }`}
          type="submit"
          style={{ fontFamily: "'Lora', serif" }}
          disabled={isLoading || isSuccess}
        >
          {isLoading
            ? "Validando..."
            : isSuccess
            ? `EVENTO ${mode === "create" ? "CREADO" : "EDITADO"}`
            : mode === "create"
            ? "CREAR EVENTO"
            : "EDITAR EVENTO"}
        </button>

        <Link href="/event/myevents">
          <p
            style={{ fontFamily: "'Lora', serif" }}
            className={`mt-3 border-b-[1px] border-gray-300 pb-1 w-max transition-opacity duration-1000
              ${isSuccess ? "opacity-100" : "opacity-0"}`}
          >
            Ir a mis eventos
          </p>
        </Link>
      </div>
    </form>
  );
};

export default EventForm;
