import { useApplication } from "@/contexts/application";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AuthCustomer } from "./auth-customer";

export function WebHeader() {
  const { establishment } = useApplication();
  const isMobile = useIsMobile();

  return (
    <header className="bg-wood-dark text-cream-light px-4 py-6 shadow-md md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        {/* Informações do Website.*/}
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <div className="mr-4 h-16 w-16 rounded-full bg-black">
              <Image
                src={"/uploads/Logo-Exemplo.png"}
                alt={`Logo Exemplo`}
                width={300}
                height={300}
                className="h-full w-full rounded-[inherit] object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold md:text-3xl">
                {establishment.application.app_name}
              </h1>
            </div>
          </div>
        </div>

        {isMobile ? <div /> : <MenuDefaultHeader />}
      </div>
    </header>
  );
}

function MenuDefaultHeader() {
  const session = useSession();
  console.log(session);

  return (
    <ul className="border">
      <li>
        <AuthCustomer />
      </li>
    </ul>
  );
}
