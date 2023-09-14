// api.js
import axios from "axios";
export const fetchAllSongs = async () => {
  try {
    const response = await axios.post(
      "https://rhythmo-mern-78ccchy9o-prince-arun.vercel.app/api/songs/get-all-songs",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch songs");
    }

    return response.data.data; // Assuming the API response contains the songs data
  } catch (error) {
    throw error;
  }
};
