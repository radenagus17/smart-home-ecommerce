import Card from "./Card";

const RecomendedProduct = ({ data }) => {
  return (
    <>
      <h4 className="text-lg text-gray-800 font-bold">Produk Rekomendasi</h4>
      <div className="flex gap-10 flex-col md:flex-row flex-wrap mt-6 items-center">
        {data.length !== 0 &&
          data
            .filter((item) => {
              const { stock_to_checkout, available } = item;
              return available && stock_to_checkout > 45;
            })
            .map((item) => {
              return <Card key={item.id} data={item} />;
            })}
      </div>
    </>
  );
};

export default RecomendedProduct;
