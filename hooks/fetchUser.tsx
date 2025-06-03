import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useUserData() {
  const [firstname, setfirstname] = useState("Guest User");
  const [lastname, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/avatars/login.jpg");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
          return;
        }

        if (user) {
          const { first_name, avatarUrl, last_name } = user.user_metadata || {};
          setAvatarUrl(avatarUrl || "/avatars/login.jpg");
          setfirstname(first_name || user.email || "User");
          setLastName(last_name || user.email || "User");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getUserData();

    const handler = () => getUserData();
    window.addEventListener("avatar-updated", handler);
    return () => window.removeEventListener("avatar-updated", handler);
  }, []);

  return { firstname, lastname, avatarUrl, isLoading };
}
