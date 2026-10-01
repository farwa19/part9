
import axios from "axios";
import type { Diary, NewDiary } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then((response) => response.data);
};

const create = async (object: NewDiary): Promise<Diary> => {
  try {
    const response = await axios.post<Diary>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

    
      if (Array.isArray(data?.error)) {
        const message = data.error
          .map((issue: { message: string }) => issue.message)
          .join(", ");

        throw new Error(message, { cause: error });
      }

      throw new Error("Something went wrong", { cause: error });
    }

    throw new Error("Something went wrong", { cause: error });
  }
};

export default { getAll, create };