import { Input } from "@/components/input";
import { messages } from "@/config/messages";
import { cn } from "@/lib/utils";
import { nextApi } from "@/services/next-api";
import { requestViaCep } from "@/services/queries/viacep";
import { queryClient } from "@/services/query-client";
import { formatterCep } from "@/tools/formatter";
import { ActionsResponse, AddressInterface } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MapPin, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";

export function AddressCard() {
  const { status } = useSession();

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

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

  function handleSelectAddress(addr: number) {
    setSelectedAddress(addr);
  }

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
    <div className="rounded-lg border border-gray-200 bg-white px-6 py-8 shadow-sm">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Endereço de Entrega
          </h2>
        </div>

        {addresses && (
          <MyAddresses
            addresses={addresses}
            onSelectChange={handleSelectAddress}
            selected={selectedAddress}
          />
        )}
      </div>

      {addresses &&
        addresses.map(function (address) {
          if (address.id === selectedAddress) {
            return (
              <div
                key={address.id}
                className={cn(
                  `cursor-pointer rounded-lg border border-gray-300 bg-green-50 p-4`,
                )}
              >
                <h4 className="text-sm font-bold">{address.description}</h4>
                <p className="text-sm text-gray-700">
                  {address.address}, {address.number}
                  {address.complement && `, ${address.complement}`}
                  {address.district}, {address.city} - {address.state}
                </p>
                <p className="text-sm text-gray-700">CEP: {address.cep}</p>
              </div>
            );
          }

          return;
        })}

      <div className="mt-6">
        {formOpen ? (
          <FormCreateAddress
            onCancelCreate={() => {
              setFormOpen(!formOpen);
            }}
            onSelectAddress={(addr) => setSelectedAddress(addr)}
          />
        ) : (
          <button
            className="cursor-pointer rounded-md border border-gray-300 bg-green-100 px-6 py-2 text-sm font-semibold text-gray-600"
            onClick={() => {
              setFormOpen(!formOpen);
            }}
          >
            Novo endereço +
          </button>
        )}
      </div>
    </div>
  );
}

export function MyAddresses({
  addresses,
  onSelectChange,
  selected,
}: {
  addresses: AddressInterface[];
  onSelectChange(addr: number): void;
  selected: number | null;
}) {
  const [open, setOpen] = useState<boolean>(false);

  function handleChange(addr: number) {
    onSelectChange(addr);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="cursor-pointer rounded-md border border-gray-400/50 bg-green-50 px-4 py-1 text-sm">
          Meus endereços
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="animate-in fade-in-0 fixed inset-0 !z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="animate-in fade-in-0 zoom-in-95 fixed top-1/2 left-1/2 !z-50 h-full w-full -translate-x-1/2 -translate-y-1/2 transform bg-white shadow-2xl duration-300 outline-none md:max-h-[70vh] md:max-w-md md:rounded-md">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <Dialog.Title className="text-lg font-bold text-gray-900">
                Meus endereços
              </Dialog.Title>
              <Dialog.Close className="rounded-full p-2 transition-colors hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-2 overflow-auto md:max-h-[55vh]">
              {addresses.map(function (address) {
                return (
                  <div
                    key={address.id}
                    className={cn(
                      `cursor-pointer rounded-lg border border-gray-300 bg-white p-4 hover:bg-green-100`,
                      address.id === selected && "bg-green-100",
                    )}
                    onClick={() => handleChange(address.id)}
                  >
                    <h4 className="text-sm font-bold">{address.description}</h4>
                    <p className="text-sm text-gray-700">
                      {address.address}, {address.number}
                      {address.complement && `, ${address.complement}`}
                      {address.district}, {address.city} - {address.state}
                    </p>
                    <p className="text-sm text-gray-700">CEP: {address.cep}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function FormCreateAddress({
  onCancelCreate,
  onSelectAddress,
}: {
  onCancelCreate(): void;
  onSelectAddress(addr: number): void;
}) {
  const [formData, setFormData] = useState({
    description: "",
    number: "",
    address: "",
    district: "",
    cep: "",
    complement: "",
    state: "",
    city: "",
    city_ibge: "",
    city_gia: "",
    city_siafi: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  function updateAddressCache(newData: AddressInterface) {
    const addressesCache = queryClient.getQueriesData<AddressInterface[]>({
      queryKey: ["customer-address"],
    });

    addressesCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      cacheData.push(newData);

      queryClient.setQueryData<AddressInterface[]>(cacheKey, cacheData);
    });
  }

  const { mutateAsync: createAddress } = useMutation({
    mutationFn: async function () {
      try {
        const response = await nextApi.post<ActionsResponse<AddressInterface>>(
          "/addresses",
          formData,
        );

        if (response.status == 200 && response.data) {
          const { data } = response.data;

          updateAddressCache(data);
          onSelectAddress(data.id);

          onCancelCreate();
          return;
        }

        throw new Error(messages.frontend.unknow_error);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const data = error.response.data as ActionsResponse<[]>;

          return setMessage(data.message);
        }

        setMessage(messages.frontend.unknow_error);
      }
    },
  });

  const [errors, setErrors] = useState<Partial<typeof formData> | null>(null);

  function setData(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function clearData() {
    setData("description", "");
    setData("address", "");
    setData("district", "");
    setData("cep", "");
    setData("complement", "");
    setData("state", "");
    setData("city", "");
    setData("city_ibge", "");
    setData("city_gia", "");
    setData("city_siafi", "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: Partial<typeof formData> = {};
    const optionalFields: (keyof typeof formData)[] = [
      "complement",
      "city_gia",
      "city_siafi",
      "city_ibge",
    ];
    for (const key in formData) {
      const field = key as keyof typeof formData;

      if (optionalFields.includes(field)) {
        continue;
      }

      if (!formData[field]) {
        newErrors[field] = "Este campo é obrigatório.";
      }
    }

    if (Object.keys(newErrors).length === 0) {
      setErrors(null);
      await createAddress();
    } else {
      setErrors(newErrors);
    }
  }

  useEffect(
    function () {
      const cepClean = formData.cep.replace(/\D/g, "");

      if (cepClean.length === 8) {
        const search = async function () {
          try {
            const response = await requestViaCep(cepClean);

            if (response && response.erro && response.erro == "true") {
              clearData();
              return;
            }

            if (response) {
              setData("address", response.logradouro);
              setData("district", response.bairro);
              setData("complement", response.complemento);
              setData("state", response.uf);
              setData("city", response.localidade);
              setData("city_ibge", response.ibge);
              setData("city_gia", response.gia);
              setData("city_siafi", response.siafi);
            }
          } catch (error) {
            console.error("Falha ao buscar CEP:", error);
          }
        };

        search();
      }
    },
    [formData.cep],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="mb-4 w-full">
        <h3 className="text-[1rem] font-semibold text-gray-500">
          Novo endereço
        </h3>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Nome/Descrição</span>

        <Input
          className={cn("", errors && errors.description && "border-red-500")}
          placeholder="Casa,Trabalho,Area de Laser..."
          value={formData.description}
          onChange={(e) => setData("description", e.currentTarget.value)}
        />
      </label>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Cep</span>

          <Input
            className={cn("", errors && errors.cep && "border-red-500")}
            value={formData.cep}
            placeholder="00000-000"
            onChange={(e) =>
              setData("cep", formatterCep(e.currentTarget.value))
            }
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Cidade</span>

          <Input
            className={cn("", errors && errors.city && "border-red-500")}
            placeholder="São Paulo,Ourinhos..."
            value={formData.city}
            onChange={(e) => setData("city", e.currentTarget.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-4">
        <div className="mt-4 w-full md:col-span-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">Endereço</span>

            <Input
              className={cn("", errors && errors.address && "border-red-500")}
              placeholder="Rua 22 de Julio"
              value={formData.address}
              onChange={(e) => setData("address", e.currentTarget.value)}
            />
          </label>
        </div>

        <div className="col-span-2 mt-4 w-full md:col-span-1">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">Bairro</span>

            <Input
              className={cn("", errors && errors.district && "border-red-500")}
              placeholder="Santa fé"
              value={formData.district}
              onChange={(e) => setData("district", e.currentTarget.value)}
            />
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-2">
          <span className="text-sm text-gray-600">Número</span>

          <Input
            className={cn("", errors && errors.number && "border-red-500")}
            placeholder="1234"
            value={formData.number}
            onChange={(e) => setData("number", e.currentTarget.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-4">
        <label className="col-span-4 mt-4 flex flex-col gap-2 md:col-span-3">
          <span className="text-sm text-gray-600">Complemento</span>

          <Input
            placeholder="Casa, Loja, Apto. ..."
            value={formData.complement}
            onChange={(e) => setData("complement", e.currentTarget.value)}
          />
        </label>

        <label className="col-span-4 mt-4 flex flex-col gap-2 md:col-span-1">
          <span className="text-sm text-gray-600">Estado (UF)</span>

          <Input
            className={cn("", errors && errors.state && "border-red-500")}
            placeholder="SP,PR..."
            value={formData.state}
            onChange={(e) => setData("state", e.currentTarget.value)}
          />
        </label>
      </div>

      {message && (
        <div className="w-full">
          <p className="text-center text-sm text-red-500">{message}</p>
        </div>
      )}

      <div
        className={cn(
          "mt-4 flex w-full items-center justify-end gap-4",
          message && "mt-0",
        )}
      >
        <button
          type="button"
          className="cursor-pointer rounded-md border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-600"
          onClick={onCancelCreate}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md border border-gray-300 bg-green-100 px-6 py-2 text-sm font-semibold text-gray-600"
        >
          Adicionar +
        </button>
      </div>
    </form>
  );
}
