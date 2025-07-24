import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ProductCard } from "@/pages/resumo/components/product-card";
import { useCart } from "@/contexts/cart-context";

const formSchema = z.object({
  cardholderName: z.string().min(2, "Nome do titular obrigatório"),
  email: z.string().email("E-mail inválido"),
  identificationNumber: z.string().min(11, "CPF obrigatório"),
  amount: z.string().min(1, "Valor obrigatório"),
});

type FormType = z.infer<typeof formSchema>;

export function MercadoPago() {
  const { cartItems } = useCart();

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

  return <form onSubmit={console.log}></form>;
}
