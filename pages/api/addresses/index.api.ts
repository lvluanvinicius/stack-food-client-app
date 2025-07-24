import { NextApiRequest, NextApiResponse } from "next";
import { get } from "./get";
import { store } from "./store";

export default function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return get(req, res);

    case "POST":
      return store(req, res);

    default:
      return res.status(405).json({
        status: false,
        message: "Method is not allowed.",
      });
  }
}
