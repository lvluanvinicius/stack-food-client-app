import Image from "next/image";

export function CardProduct() {
  return (
    <div className="flex h-44 items-center justify-between gap-4">
      <div className="h-44 w-44 rounded-xl">
        <Image
          src={`http://app.stackfood.com/client/teste/foods/Rbr6ZvlDTwWeP37O-image.png`}
          alt={"teste"}
          width={200}
          height={200}
          className="h-full w-full rounded-[inherit]"
          unoptimized
        />
      </div>

      <div className="h-full flex-1 text-white">
        <h2 className="mb-2 text-2xl font-bold">Barbecue</h2>
        <p>
          Burger (160g), mussarela, bacon, alface americana, cebola
          caramelizada, molho barbecue e maionese Don{"'"}s no pão de brioche.
        </p>
      </div>

      <div className="flex h-full flex-col justify-between">
        <span className="w-full text-end text-xl font-bold text-white">
          <span className="text-xs">R$</span> 100,
          <span className="text-xs">00</span>{" "}
        </span>
        <button className="bg-emphasis text-primary hover:bg-emphasis-strong cursor-pointer rounded px-6 py-1.5 font-bold">
          Add +
        </button>
      </div>
    </div>
  );
}
