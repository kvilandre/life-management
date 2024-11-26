import ky from "ky";
import { CreateHeader } from "../shared/apiSettings";
import { Organization } from "./organization";

export async function DeleteOrganization(id: number) {
  const api = CreateHeader();

  const response = await api.delete("Organization/DeleteOrganization/" + id);
  return response;
}

export async function CreateOrganization() {
  const api = CreateHeader();

  const response = await api
    .get("Organization/CreateOrganization/")
    .json<Organization>();
  return response;
}

// export const removeTrial = async (id) => {
//   return await axios.delete(
//     `${process.env.REACT_APP_DBAPI}/trials/DeleteTrial/${id}`
//   );
// };
