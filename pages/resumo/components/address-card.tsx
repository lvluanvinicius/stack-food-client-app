import { cn } from "@/lib/utils";
import { nextApi } from "@/services/next-api";
import { ActionsResponse, AddressInterface } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function AddressCard() {
  const { status } = useSession();

  const [selectedAddress, setSelectedAddress] = useState<number | null>();

  const { data: addresses } = useQuery({
    queryKey: ["customer-address"],
    queryFn: async function () {
      const response =
        await nextApi.get<ActionsResponse<AddressInterface[]>>("/addresses");

      if (response.status === 200 && response.data) {
        return response.data.data;
      }

      return;
    },
    enabled: status === "authenticated",
  });

  useEffect(
    function () {
      if (addresses && addresses.length >= 1) {
        const df = addresses.find((addr) => addr.default == "Y");
        if (df) {
          setSelectedAddress(df.id);
        } else {
          setSelectedAddress(addresses[0].id);
        }
      }
    },
    [addresses, setSelectedAddress],
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Endereço de Entrega
        </h2>
      </div>

      {addresses &&
        addresses.map(function (address) {
          if (address.id === selectedAddress) {
            return (
              <div
                key={address.id}
                className={cn(
                  `rounded-lg border border-gray-300 bg-white p-4 hover:bg-green-100`,
                  address.id === selectedAddress && "bg-green-100",
                )}
              >
                <p className="text-sm text-gray-700">
                  {address.address}, {address.number}
                  {address.complement && `, ${address.complement}`}
                </p>
                <p className="text-sm text-gray-700">
                  {address.district}, {address.city} - {address.state}
                </p>
                <p className="text-sm text-gray-700">CEP: {address.cep}</p>
              </div>
            );
          }

          return;
        })}

      <div className="mt-4">
        <
      </div>
    </div>
  );
}

export function FormAddress() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <div>
      <div>Outros</div>

      {formOpen && <form>Cadastrar</form>}
    </div>
  );
}

export function SelectExistsAddress({
  addresses,
}: {
  addresses: AddressInterface[];
}) {
  const [open, setOpen] = useState<boolean>(false);

  <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
      <button>Meus endereços</button>
    </Dialog.Trigger>
  </Dialog.Root>;
}
