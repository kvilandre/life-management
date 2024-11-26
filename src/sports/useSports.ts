import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { CreateHeader } from "../shared/apiSettings";
import { Sport } from "./sport";

export function useSports() {
  const api = CreateHeader();

  return useQuery<Sport[]>({
    queryFn: async () => {
      const response = await api.get("Sport/GetSports");
      return response.json();
    },
    queryKey: ["sports"],
  });
}
