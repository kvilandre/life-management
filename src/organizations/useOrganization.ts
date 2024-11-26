import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Organization } from "./organization";
import { CreateHeader } from "../shared/apiSettings";

export function useGetOrganizations() {
  const api = CreateHeader();

  return useQuery<Organization[]>({
    queryFn: async () => {
      const response = await api.get("Organization/GetOrganizations");
      return response.json();
    },
    queryKey: ["organizations"],
  });
}
