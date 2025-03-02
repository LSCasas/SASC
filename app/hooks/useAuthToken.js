import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthUser } from "../api/user";

export default function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await AuthUser();
      setUser(currentUser);
      if (!currentUser) {
        router.push("/InicioDeSesion");
      }
    }

    checkUser();
  }, [router]);

  return user;
}
