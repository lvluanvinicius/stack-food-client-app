import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const formRegisterSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormLoginType = z.infer<typeof formLoginSchema>;
type FormRegisterType = z.infer<typeof formRegisterSchema>;

export function AuthCustomer() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<FormLoginType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<FormRegisterType>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (data: FormLoginType) => {
    setIsLoading(true);
    try {
      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login:", data);
      setOpen(false);
      loginForm.reset();
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: FormRegisterType) => {
    setIsLoading(true);
    try {
      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Registro:", data);
      setOpen(false);
      registerForm.reset();
    } catch (error) {
      console.error("Erro no registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Entrar</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%-50%] rounded-md border bg-white p-4">
          <Tabs.Root defaultValue={activeTab}>
            <Tabs.List>
              <Tabs.Trigger value="account">Login</Tabs.Trigger>
              <Tabs.Trigger value="register">Registro</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="login">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <label className="flex flex-col gap-4">
                  <span>E-mail</span>
                  <input placeholder="Ex: minhaconta@exemplo.com" />
                </label>

                <label className="flex flex-col gap-4">
                  <span>Senha</span>
                  <input />
                </label>

                <footer>
                  <button type="submit">Entrar</button>
                  <button type="button">Cancelar</button>
                </footer>
              </form>
            </Tabs.Content>

            <Tabs.Content value="register">
              <p>Access and update your documents.</p>
            </Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
