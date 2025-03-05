import React, { useEffect, useState } from "react";
import Login from "../components/LoginForm";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const loginError = localStorage.getItem("loginError");
    if (loginError) {
      setError(loginError);
      localStorage.removeItem("loginError");
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
