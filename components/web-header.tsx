import { ApplicationSettingInterface } from "@/types/application-setting";
import Image from "next/image";

export function WebHeader({
  establishment,
}: {
  establishment: ApplicationSettingInterface;
}) {
  return (
    <header className="@container mt-8">
      <nav className="@min-md:w-[60vw]  mx-auto flex @min-md:p-0 @min-md:items-end gap-6 px-4 flex-col items-center @min-md:flex-row">
        <div className="w-[7rem] h-[7rem] @min-md:w-[10rem] @min-md:h-[10rem] rounded-lg">
          <Image
            src={"/uploads/Logo-Exemplo.png"}
            alt={`Logo Exemplo`}
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col @min-md:justify-end gap-6 items-center @min-md:items-start ">
          <h1 className="text-white @min-md:text-2xl text-[1.1rem] font-bold">
            {establishment.application.app_name}
          </h1>

          <div className="text-white opacity-80 flex flex-col gap-2 items-center @min-md:items-start ">
            <div className="text-sm w-full flex flex-col items-center @min-md:items-center @min-md:gap-2 @min-md:flex-row">
              <strong>Contato: </strong>
              <span className="text-xs">
                {establishment.establishment.phone}
              </span>
            </div>

            <div className="text-sm mb-2 w-full flex flex-col items-center @min-md:items-center @min-md:gap-2 @min-md:flex-row">
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
