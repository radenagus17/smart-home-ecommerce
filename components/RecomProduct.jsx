import Card from "./Card";

const RecomendedProduct = ({ data, idx }) => {
  return (
    <>
      <h4 className="text-lg text-gray-800 font-bold">Produk Rekomendasi</h4>
      <div className="flex gap-10 flex-col md:flex-row flex-wrap mt-6 items-center">
        {data.length !== 0 &&
          data
            .filter((item, index) => {
              const { available } = item;
              return available && index > idx && index < idx + 3;
            })
            .map((item) => {
              return <Card key={item.id} data={item} />;
            })}
      </div>
    </>
  );
};

export default RecomendedProduct;
