import { nextApi } from "@/services/next-api";
import {
  ActionsResponse,
  AddressInterface,
  FormAddressInterface,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MapPin, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function AddressCard() {
  const { status } = useSession();

  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] =
    useState<FormAddressInterface | null>();

  const { data: addresses } = useQuery({
    queryKey: ["customer-address"],
    queryFn: async function () {
      const response = await nextApi.get<
        ActionsResponse<{
          default_address: "S" | "N";
          default: AddressInterface;
          addresses: AddressInterface[];
        }>
      >("/addresses");

      if (response.status === 200 && response.data) {
        return response.data.data;
      }

      return;
    },
    enabled: status === "authenticated",
  });

  // Limpa o estado do endereço selecionado.
  const selectedAddressClear = function () {
    setSelectedAddress({
      address: "",
      cep: "",
      city: "",
      city_gia: "",
      city_ibge: "",
      city_siafi: "",
      complement: "",
      district: "",
      state: "",
      number: "",
    });
  };

  // Faz o carregamento do endereço padrão a partor do seletor de decisão do cliente.
  const toggleDefaultAddress = function (state: boolean) {
    if (state && addresses && addresses.default.cep) {
      setUseDefaultAddress(true);
      setSelectedAddress({
        ...addresses.default,
      });
    } else {
      setUseDefaultAddress(false);
      selectedAddressClear();
    }
  };

  // Carrega o endereço padrão.
  useEffect(
    function () {
      if (addresses && addresses.default_address === "S") {
        if (addresses.default.cep) {
          setUseDefaultAddress(true);
          setSelectedAddress({
            ...addresses.default,
          });
        }
      }
    },
    [addresses],
  );

  console.log(selectedAddress);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Endereço de Entrega
        </h2>
      </div>
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              checked={useDefaultAddress}
              onChange={() => toggleDefaultAddress(true)}
              className="h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <User className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Usar endereço padrão</span>
          </label>
        </div>

        {useDefaultAddress && addresses && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              {addresses.default.address}, {addresses.default.number}
              {addresses.default.complement &&
                `, ${addresses.default.complement}`}
            </p>
            <p className="text-sm text-gray-700">
              {addresses.default.district}, {addresses.default.city} -{" "}
              {addresses.default.state}
            </p>
            <p className="text-sm text-gray-700">
              CEP: {addresses.default.cep}
            </p>
          </div>
        )}

        <label className="mt-4 flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            checked={!useDefaultAddress}
            onChange={() => toggleDefaultAddress(false)}
            className="h-4 w-4 text-green-600 focus:ring-green-500"
          />
          <span className="text-sm font-medium">Usar outro endereço</span>
        </label>
      </div>

      {!useDefaultAddress && (
        <FormAddress addresses={addresses ? addresses.addresses : []} />
      )}
    </div>
  );
}

export function FormAddress({ addresses }: { addresses: AddressInterface[] }) {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <div>
      <div>Outros</div>

      {formOpen && <form>Cadastrar</form>}
    </div>
  );
}
