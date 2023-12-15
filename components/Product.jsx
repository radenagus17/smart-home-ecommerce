const Product = ({ children }) => {
  return (
    <section className="mt-8 w-full">
      <div className="px-5 md:px-10 flex flex-col">{children}</div>
    </section>
  );
};

export default Product;
