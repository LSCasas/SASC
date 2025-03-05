import React, { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useRouter } from "next/router";
import { login } from "@/api/auth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      localStorage.setItem("campuses", JSON.stringify(response.campuses));
      router.push("/enlacesDeSedes");
    } catch (error) {}
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mt-24 w-full">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#B0005E]">
        Iniciar sesión
      </h2>
      <form id="loginForm" onSubmit={handleSubmit(onSubmit)} method="POST">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.email }
            )}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.password }
            )}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <span
            onClick={handleShowHidePassword}
            className="text-xs text-[#B0005E] cursor-pointer hover:text-[#6C0036]"
          >
            {showPassword ? " Ocultar " : " Mostrar"} contraseña
          </span>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
