import { ActionsResponse, ViacepInterface } from "@/types";
import { nextApi } from "../next-api";

export async function requestViaCep(cep: string) {
  const response = await nextApi.get<ActionsResponse<ViacepInterface>>(
    "services/viacep",
    {
      params: {
        cep,
      },
    },
  );

  const { data } = response;

  if (data.status) {
    return data.data;
  }

  return null;
}
