import { messages } from "@/config/messages";
import { establishment } from "@/services/establishment";
import { ActionsResponse } from "@/types";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method != "GET") {
      return res.status(400).json({
        status: false,
        message: messages.backend.methodIsNotAllowed,
      });
    }

    const cep = req.query.cep;

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Sua sessão é inválida.",
      });
    }

    const response = await establishment.get("/services/viacep", {
      params: {
        cep,
      },
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

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
