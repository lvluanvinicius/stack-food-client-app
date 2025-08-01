import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { X, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { formatPhone } from "@/tools/formatter";
import { nextApi } from "@/services/next-api";
import { ActionsResponse } from "@/types";
import { AxiosError } from "axios";
import { messages } from "@/config/messages";
import { useAuth } from "@/contexts/auth-provider";

export const AuthCustomer: React.FC = () => {
  const { formOpen, onOpenFormChange } = useAuth();

  const [formValue, setFormValue] = useState("login");
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loginData, setLoginData] = useState<{
    phone: string;
    password: string;
  }>({
    phone: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<{
    name: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  async function onLogin() {
    const response = await signIn("credentials", {
      phone: loginData.phone,
      password: loginData.password,
      callbackUrl: router.asPath,
      redirect: false,
    });

    if (response) {
      if (response.ok) {
        return null;
      } else {
        setMessage(response.error);
        return;
      }
    }

    setMessage("Houve um erro desconhecido ao efetuar o login.");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await onLogin();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setMessage("As senhas não coincidem");
      return;
    }

    try {
      const response = await nextApi.post<ActionsResponse<[]>>(
        "/sign-up",
        registerData,
      );

      if (response.status === 200 && response.data.status) {
        setLoginData({
          phone: registerData.phone,
          password: registerData.password,
        });
        setRegisterData({
          confirmPassword: "",
          name: "",
          password: "",
          phone: "",
        });

        await onLogin();
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const data = error.response.data as ActionsResponse<[]>;

        return setMessage(data.message);
      }

      setMessage(messages.frontend.unknow_error);
    }
  };

  return (
    <Dialog.Root open={formOpen} onOpenChange={onOpenFormChange}>
      <Dialog.Trigger asChild>
        <button className="flex items-center space-x-2 rounded-lg border border-amber-200 px-4 py-2 transition-colors duration-200 hover:bg-amber-700">
          <User className="h-4 w-4" />
          <span className="font-medium">Entrar</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-in fade-in-0 fixed inset-0 !z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="animate-in fade-in-0 zoom-in-95 fixed top-1/2 left-1/2 !z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white shadow-2xl duration-300">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                Bem-vindo ao Bryan
              </Dialog.Title>
              <Dialog.Close className="rounded-full p-2 transition-colors hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="mb-6 text-center text-gray-600">
              Acesse sua conta ou registre-se para fazer seus pedidos
            </Dialog.Description>

            <Tabs.Root
              onValueChange={(form) => setFormValue(form)}
              defaultValue={formValue}
              className="w-full"
            >
              <Tabs.List className="mb-6 grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1">
                <Tabs.Trigger
                  value="login"
                  className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:text-gray-900 data-[state=active]:bg-white data-[state=active]:text-amber-900 data-[state=active]:shadow-sm"
                >
                  Entrar
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="register"
                  className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:text-gray-900 data-[state=active]:bg-white data-[state=active]:text-amber-900 data-[state=active]:shadow-sm"
                >
                  Registrar
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Celular
                    </label>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={loginData.phone}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            phone: formatPhone(e.target.value),
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                        placeholder="14 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                        placeholder="Sua senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {message && (
                    <div>
                      <p className="text-center text-sm text-red-400">
                        {message}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full transform rounded-lg bg-gradient-to-r from-amber-900 to-amber-800 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-amber-800 hover:to-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Entrar
                  </button>

                  {/* <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-amber-800 hover:text-amber-900 hover:underline"
                    >
                      Esqueceu sua senha?
                    </button>
                  </div> */}
                </form>
              </Tabs.Content>

              <Tabs.Content value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={registerData.name}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                        placeholder="Seu nome completo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Celular
                    </label>
                    <div className="relative">
                      <Phone className="absolute top-4 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={registerData.phone}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            phone: formatPhone(e.target.value),
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                        placeholder="14 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                        placeholder="Crie uma senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                        placeholder="Confirme sua senha"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {message && (
                    <div>
                      <p className="text-center text-sm text-red-400">
                        {message}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full transform rounded-lg bg-gradient-to-r from-amber-900 to-amber-800 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-amber-800 hover:to-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Criar Conta
                  </button>
                </form>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
