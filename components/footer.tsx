import { useApplication } from "@/contexts/application";
import Image from "next/image";

export function Footer() {
  const { establishment } = useApplication();

  return (
    <footer className="bg-wood-dark text-cream-light py-6">
      <div className="container mx-auto mt-4 grid px-4 text-center md:grid-cols-5">
        <div className="col-span-1 flex flex-col items-center gap-4">
          <div className="h-28 w-28 rounded-full bg-black">
            <Image
              src={"/uploads/Logo-Exemplo.png"}
              alt={`Logo Exemplo`}
              width={300}
              height={300}
              className="h-full w-full rounded-[inherit] object-cover"
            />
          </div>

          <div className="">
            <p className="mb-1 text-sm">
              <strong>Contato: </strong>
              <br />
              <span className="text-xs">
                {establishment.establishment.phone}
              </span>
            </p>
            <p className="text-sm">
              <strong>Endereço: </strong>
              <br />
              <span className="text-xs">
                {establishment.establishment.address} -{" "}
                {establishment.establishment.postal_code}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 px-4 text-center">
        <p className="text-xs">
          © {new Date().getFullYear()}{" "}
          {establishment.establishment.company_name}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
