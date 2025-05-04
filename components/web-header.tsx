import { useApplication } from "@/contexts/application";
import Image from "next/image";

export function WebHeader() {
  const { establishment } = useApplication();

  return (
    <header className="bg-wood-dark text-cream-light px-4 py-6 shadow-md md:px-8">
      <div className="container mx-auto">
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
              <h1 className="font-montserrat text-lg font-bold md:text-3xl">
                {establishment.application.app_name}
              </h1>
            </div>
          </div>

          <div className="text-center md:ml-auto md:text-right">
            <p className="mb-1 text-sm">
              <strong>Contato: </strong>
              <span className="text-xs">
                {establishment.establishment.phone}
              </span>
            </p>
            <p className="text-sm">
              <strong>Endereço: </strong>
              <span className="text-xs">
                {establishment.establishment.address} -{" "}
                {establishment.establishment.postal_code}
              </span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
