const Category = ({ data }) => {
  return (
    <section className="md:mt-40 w-full mt-32">
      <div className="px-5 md:px-10 flex flex-col">
        <p className="text-sm text-orange-400">Lihat semua produk</p>
        <h2 className="text-3xl text-gray-800 font-bold my-2">Produk Pilihan</h2>
        <div className="flex gap-4 flex-wrap mt-3">
          {data.length !== 0 &&
            data.map((item) => {
              const { id, category_name } = item;
              return (
                <button key={id} className="py-2 px-3 border hover:outline-none hover:border-transparent hover:ring-1 hover:ring-orange-400 hover:text-orange-400 transition duration-300">
                  {category_name}
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Category;
