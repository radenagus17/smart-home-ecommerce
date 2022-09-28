const Product = ({ children }) => {
  return (
    <section className="md:mt-24 w-full mt-20">
      <div className="px-5 md:px-10 flex flex-col">
        <h4 className="text-lg text-gray-800 font-bold">Produk Rekomendasi</h4>
        <div className="flex gap-10 flex-col md:flex-row flex-wrap mt-6 items-center">{children}</div>
      </div>
    </section>
  );
};

export default Product;
