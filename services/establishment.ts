import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_ESTABLISHMENT_API_URL || "";
const appPath = process.env.NEXT_PUBLIC_ESTABLISHMENT_APP_PATH || "404";

export const establishment = axios.create({
  baseURL: `${apiUrl}/${appPath}`,
  headers: {
    Accept: "application/json",
  },
});
