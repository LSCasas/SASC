import React, { useEffect } from "react";
import { toast } from "sonner";
import Login from "../components/LoginForm";

const LoginPage = () => {
  useEffect(() => {
    const errorMessage = localStorage.getItem("loginError");
    if (errorMessage) {
      toast.error(errorMessage);
      localStorage.removeItem("loginError");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="bg-gradient-to-r from-[#B0005E] to-[#6C0036] py-4 justify-center items-start p-10 flex-[0.9] hidden md:flex"></div>

      <div className="flex justify-center items-start bg-white p-10 flex-1 ">
        <div className="w-full max-w-md mt-10">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
