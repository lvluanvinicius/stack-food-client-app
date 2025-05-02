import { useApplication } from "@/contexts/application";
import Image from "next/image";

export function WebHeader() {
  const { establishment } = useApplication();

  return (
    <header className="@container mt-8">
      <nav className="mx-auto flex flex-col items-center gap-6 px-4 @min-md:w-[60vw] @min-md:flex-row @min-md:items-end @min-md:p-0">
        <div className="h-[7rem] w-[7rem] rounded-lg @min-md:h-[10rem] @min-md:w-[10rem]">
          <Image
            src={"/uploads/Logo-Exemplo.png"}
            alt={`Logo Exemplo`}
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col items-center gap-6 @min-md:items-start @min-md:justify-end">
          <h1 className="text-[1.1rem] font-bold text-white @min-md:text-2xl">
            {establishment.application.app_name}
          </h1>

          <div className="flex flex-col items-center gap-2 text-white opacity-80 @min-md:items-start">
            <div className="flex w-full flex-col items-center text-sm @min-md:flex-row @min-md:items-center @min-md:gap-2">
              <strong>Contato: </strong>
              <span className="text-xs">
                {establishment.establishment.phone}
              </span>
            </div>

            <div className="mb-2 flex w-full flex-col items-center text-sm @min-md:flex-row @min-md:items-center @min-md:gap-2">
              <strong>Endereço: </strong>
              <span className="text-xs">
                {establishment.establishment.address} -{" "}
                {establishment.establishment.postal_code}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
