import { useCart } from "@/contexts/cart-context";
import { MenuItem } from "@/types/globals";
import { MenuItemInterface } from "@/types/menu";
import { CirclePlus, PlusCircle } from "lucide-react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

interface AddToCartProps {
  item: MenuItemInterface;
}

export function AddToCart({ item }: AddToCartProps) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState<boolean>(false);

  const handleAddToCart = function () {
    const add: MenuItem = {
      category: "",
      description: item.description,
      id: item.id,
      name: item.name,
      photo: item.photo,
      price: parseFloat(item.original_value),
      featured: false,
    };

    addToCart(add);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="bg-primary-500 hover:bg-primary-600 flex w-full cursor-pointer items-center justify-center rounded-md py-2 font-medium text-white transition-colors duration-200"
          aria-label={`Adicionar ${item.name} ao carrinho`}
        >
          <PlusCircle size={18} className="mr-2" />
          <span>Adicionar</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50" />
        <Dialog.Content className="fixed top-0 right-0 z-50 flex h-full w-full flex-col gap-4 overflow-auto bg-white p-6 shadow-xl sm:w-96">
          <div className="w-full">
            <Dialog.Title className="text-xl font-semibold">
              {item.name}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 opacity-70">
              {item.name}
            </Dialog.Description>
          </div>

          <Separator className="h-px w-full bg-gray-200" />

          {/* Header */}
          <div className="w-full">
            <div className="h-44 w-44 rounded-2xl">
              <Image
                alt={item.name}
                src={item.photo}
                width={400}
                height={400}
                className="h-full w-full rounded-[inherit] object-cover"
              />
            </div>
          </div>
          {/* Stop Header */}

          <div className="w-full flex-1 overflow-auto border"></div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-primary-500 hover:bg-primary-600 flex w-full cursor-pointer items-center justify-center rounded-md py-2 font-medium text-white transition-colors duration-200"
            >
              <CirclePlus />
              <span>Adicionar</span>
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full cursor-pointer rounded-md border border-gray-300 py-2 font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50"
            >
              Fechar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
