import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { CreateHeader } from "../shared/apiSettings";
import { Title } from "./title";

export function useTitles() {
  const api = CreateHeader();

  return useQuery<Title[]>({
    queryFn: async () => {
      const response = await api.get("Title/GetTitles");
      return response.json();
    },
    queryKey: ["titles"],
  });
}
