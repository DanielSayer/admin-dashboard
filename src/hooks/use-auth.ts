import { getUser } from "@/server/user";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user: data };
}
