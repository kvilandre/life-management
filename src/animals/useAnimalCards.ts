import { useQuery } from "@tanstack/react-query";
import { AnimalCard } from "./animalCard";
import { CreateHeader } from "../shared/apiSettings";

export function useAnimalCards() {
  const api = CreateHeader();

  return useQuery<AnimalCard[]>({
    queryFn: async () => {
      const response = await api.get("Animal/GetAnimalCards");
      return response.json();
    },
    queryKey: ["animalCards"],
  });
}
