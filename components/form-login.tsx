import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export function FormLogin() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button>Entrar</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <form>
          <div className="border">teste</div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
