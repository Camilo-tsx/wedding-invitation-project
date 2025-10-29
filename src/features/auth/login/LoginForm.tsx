"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/auth.schema";
import { InferInput } from "valibot";
import { valibotResolver } from "@/components/form/valibotResolver";
import InputForm from "@/components/form/CustomInput";
import "../auth.css";
import { useState } from "react";

type FormValues = InferInput<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.status === 401) {
        if (result.field && result.error) {
          setError(result.field, { type: "server", message: result.error });
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
      className="flex flex-col max-w-[200px] md:max-w-[400px] lg:text-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm
        fieldName="email"
        control={control}
        label="Email"
        type="email"
        placeHolder="Ingresa tu email"
        error={errors.email}
        inputClassName="border border-[2px] rounded-lg px-2 p-1 mb-2 mt-1"
      />
      <InputForm
        fieldName="password"
        control={control}
        label="Password"
        type="password"
        placeHolder="Ingresa tu contraseña"
        error={errors.password}
        inputClassName="border border-[2px] rounded-lg px-2 p-1 mt-1"
      />
      <button
        className="submit-button border border-[2px] border-[#efefef] rounded-md text-[#323232] bg-[#efefef] mt-5  p-1"
        type="submit"
        style={{ fontFamily: "'Lora', serif" }}
        disabled={isLoading}
      >
        {isLoading ? "Validando..." : "Enviar"}
      </button>
    </form>
  );
};

export default LoginForm;
