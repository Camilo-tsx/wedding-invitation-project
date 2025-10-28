"use client";

import { valibotResolver } from "@/components/form/valibotResolver";
import InputForm from "@/components/form/CustomInput";
import "../auth.css";
import { InferInput } from "valibot";
import { SubmitHandler, useForm } from "react-hook-form";
import { authSchema } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";

import { useState } from "react";

type FormValues = InferInput<typeof authSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: valibotResolver(authSchema),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          if (result.field && result.error) {
            setError(result.field, { type: "server", message: result.error });
          }
        } else {
          setError("root", {
            type: "server",
            message: result.error || "Error inesperado",
          });
        }
        return;
      }

      console.log("Registro exitoso", result);
      window.location.href = "/";
    } catch (err) {
      console.error("aca paso algo", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col max-w-[200px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm
        fieldName="email"
        control={control}
        label="Email"
        type="email"
        placeHolder="Ingresa tu email"
        error={errors.email}
        inputClassName="border border-[2px] rounded-lg p-1 px-2 mb-2 mt-1"
      />
      <InputForm
        fieldName="userName"
        control={control}
        label="User name"
        type="text"
        placeHolder="Nombre de usuario"
        error={errors.userName}
        inputClassName="border border-[2px] rounded-lg p-1 px-2 mb-2 mt-1"
      />
      <InputForm
        fieldName="password"
        control={control}
        label="Password"
        type="password"
        placeHolder="Ingresa tu contraseña"
        error={errors.password}
        inputClassName="border border-[2px] rounded-lg p-1 px-2 mb-2 mt-1"
      />
      <button
        className="submit-button border border-[2px] border-[#efefef] rounded-md text-[#323232] bg-[#efefef] p-1 my-3"
        type="submit"
        style={{ fontFamily: "'Lora', serif" }}
        disabled={isLoading}
      >
        {isLoading ? "Validando..." : "Enviar"}
      </button>
    </form>
  );
};

export default RegisterForm;
