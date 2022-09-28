const Category = () => {
  const category = [
    {
      id: 1,
      name: "Handphone",
    },
    {
      id: 2,
      name: "Baju",
    },
    {
      id: 3,
      name: "Elektronik",
    },
    {
      id: 4,
      name: "Otomotif",
    },
    {
      id: 5,
      name: "Kosmetik",
    },
    {
      id: 6,
      name: "Hijab",
    },
    {
      id: 7,
      name: "Perhiasan",
    },
    {
      id: 8,
      name: "Tas Wanita",
    },
    {
      id: 9,
      name: "Robot",
    },
    {
      id: 10,
      name: "Jaket",
    },
  ];
  return (
    <section className="md:mt-40 w-full mt-32">
      <div className="px-5 md:px-10 flex flex-col">
        <p className="text-sm text-orange-400">Lihat semua produk</p>
        <h2 className="text-3xl text-gray-800 font-bold my-2">Produk Pilihan</h2>
        <div className="flex gap-4 flex-wrap mt-3">
          {category.map((item) => {
            const { id, name } = item;
            return (
              <button className="py-2 px-3 border" key={id}>
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
