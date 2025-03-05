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
          "Recuerda cerrar sesión y volver a ingresar si desea cambiar de sede."
        );
        router.push("/alumnos");
      }
    }

    checkUser();
  }, [router]);

  return user;
}
