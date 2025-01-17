import axios from "axios";
import { SongResponse } from "@/types/song";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const songApi = {
  getSong: async (id: string): Promise<SongResponse> => {
    const response = await axios.get(`${API_URL}/api/v1/songs/share/${id}`);
    return response.data;
  },
};
