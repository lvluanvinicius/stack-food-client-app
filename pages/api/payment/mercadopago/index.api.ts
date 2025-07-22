import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { establishment } from "@/services/establishment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { token, payment_method_id, transaction_amount, payer } = req.body;
  const accessToken = process.env.MP_ACCESS_TOKEN!;

  try {
    const response = await establishment.get<ActionsResponse<[]>>(
      "mercadopago/payment",
      {},
    );

    if (response.data && response.status === 200) {
      if (response.data.status) {
        return res.status(200).json(response.data);
      } else {
        throw new Error(response.data.message);
      }
    }

    const mpRes = await axios.post(
      "",
      {
        transaction_amount,
        token,
        payment_method_id,
        installments: 1,
        payer,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return res.status(200).json(mpRes.data);
  } catch (err: any) {
    console.error(err.response?.data);
    return res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data });
  }
}
