import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  cardholderName: z.string().min(2, "Nome do titular obrigatório"),
  email: z.string().email("E-mail inválido"),
  identificationNumber: z.string().min(11, "CPF obrigatório"),
  amount: z.string().min(1, "Valor obrigatório"),
});

type FormType = z.infer<typeof formSchema>;

export function MercadoPago() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  async function submit(data: FormType) {
    setLoading(true);
    setStatus(null);

    try {
      console.log(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={console.log} className="container mx-auto px-4">
      <div className="flex flex-col gap-4">
        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* Resumo do pedido. */}
          <div className="col-span-2 flex flex-col gap-4 rounded-md bg-white p-4">
            <div className="w-full">
              <h4 className="">Produtos</h4>

              <div className="mt-4">sad</div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="col-span-1 rounded-md bg-white p-4">Card</div>
        </div>
      </div>
    </form>
  );
}
