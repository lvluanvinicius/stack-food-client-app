import { CardProduct } from "./card-product";

export function ProductList() {
  return (
    <div>
      <section className="@container mx-4 mt-8 mb-4 @min-md:mx-0">
        <div className="bg-variant mx-auto flex gap-6 rounded-md px-4 py-2 @min-md:w-[60vw]">
          <h3 className="font-bold">Duplo Burguers</h3>
        </div>

        <div className="mx-auto mt-4 flex flex-col gap-6 rounded-md px-4 py-2 @min-md:w-[60vw]">
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
        </div>
      </section>

      <section className="@container mx-4 mt-8 mb-4 @min-md:mx-0">
        <div className="bg-variant mx-auto flex gap-6 rounded-md px-4 py-2 @min-md:w-[60vw]">
          <h3 className="font-bold">Duplo Burguers</h3>
        </div>

        <div className="mx-auto mt-4 flex flex-col gap-6 rounded-md px-4 py-2 @min-md:w-[60vw]">
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
          <CardProduct />
          <hr />
        </div>
      </section>
    </div>
  );
}
