import ky from "ky";
import { CreateHeader } from "../shared/apiSettings";

export async function DeleteSport(id: number) {
  const api = CreateHeader();

  const response = await api.delete("Sport/DeleteSport/" + id);
  return response;
}

// export const removeTrial = async (id) => {
//   return await axios.delete(
//     `${process.env.REACT_APP_DBAPI}/trials/DeleteTrial/${id}`
//   );
// };
