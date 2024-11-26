import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { AnimalDetail } from "./animalDetail";
import { CreateHeader } from "../shared/apiSettings";

export function useAnimalDetails(id: number) {
  const api = CreateHeader();

  let middleVariable = useQuery<AnimalDetail>({
    queryFn: async () => {
      const response = await api.get("Animal/GetAnimalDetail/" + id);
      return response.json();
    },
    queryKey: ["animalDetails"],
  });

  console.log(middleVariable);

  return middleVariable;
}
