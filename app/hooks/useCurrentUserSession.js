import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCurrentUser } from "../api/user";
import { toast } from "react-toastify";

export default function useCurrentUser() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (!currentUser) {
        router.push("/InicioDeSesion");
        return;
      }

      if (currentUser.selectedCampusId) {
        toast.info(
          "Debes salir de la sesión primero, y volver a entrar para ir al enlace de sedes."
        );
        router.push("/alumnos");
      }
    }

    checkUser();
  }, [router]);

  return user;
}
