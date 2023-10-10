import Repository, { getError } from "../../repositories/genericRepository";
import { baseUrl } from "../../repositories/genericRepository";
import { withAuth } from "../Helpers/withAuth";

export const logsAPI = async (message, userData) => {
  let payload = {
    name: `${userData.firstName} ${userData.surName}`,
    email: userData.email,
    group: userData?.group?.groupName,
    log: message,
  };
  try {
    const response = await Repository.post(`${baseUrl}/logs`, payload);
  } catch (error) {}
};
