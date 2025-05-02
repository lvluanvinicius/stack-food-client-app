import Image from "next/image";

export function CardProduct() {
  return (
    <div className="border">
      <div className="h-28 w-28">
        <Image
          src={`http://app.stackfood.com/client/teste/foods/ZOO06PbkKpY7K4cM-gallery_0b841d45-90fb-4dad-98f7-88d9387f6ab9.jpg`}
          alt={""}
          width={200}
          height={200}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
