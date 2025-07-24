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
    const response = await establishment.get<ActionsResponse<[]>>("menu", {
      params: {
        ...req.query,
      },
    });

    if (response.data && response.status === 200) {
      if (response.data.status) {
        return res.status(200).json(response.data);
      } else {
        throw new Error(response.data.message);
      }
    }

    throw new Error(messages.backend.unknownError);
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
