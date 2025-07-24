import { messages } from "@/config/messages";
import { establishment } from "@/services/establishment";
import { ActionsResponse } from "@/types";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = req.body;

    const response = await establishment.post("/sign-up", data);

    if (response.status === 200) {
      return res.status(response.status).json(response.data);
    }

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        const data = error.response.data as ActionsResponse<[]>;

        return res.status(error.response.status).json(data);
      }

      if (error instanceof Error) {
        return res.status(400).json({
          status: false,
          message: error.message,
        });
      }

      return res.status(400).json({
        status: false,
        message: messages.backend.unknownError,
      });
    }
  }
}
