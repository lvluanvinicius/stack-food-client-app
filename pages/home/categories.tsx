export function Categories() {
  return (
    <section className="@container mx-4 mt-8 @min-md:mx-0">
      <div className="mx-auto flex items-center justify-between gap-8 py-2 @min-md:w-[60vw]">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <button
              key={index}
              className="bg-emphasis hover:bg-emphasis-strong cursor-pointer rounded-md px-4 py-2 text-xs font-bold transition-colors duration-300"
            >
              Especiais Burguer
            </button>
          ))}
        </div>

        <button className="bg-emphasis hover:bg-emphasis-strong cursor-pointer rounded-md px-4 py-2 text-xs font-bold transition-colors duration-300">
          ...
        </button>
      </div>
    </section>
  );
}
