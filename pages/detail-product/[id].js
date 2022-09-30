import Layout from "../../widget/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const DetailProduct = () => {
  const router = useRouter();

  const [dataProduct, setDataProduct] = useState(null);

  let { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      axios.get(`https://service-example.sanbercloud.com/api/product/${id}`).then((res) => {
        let data = res.data;
        setDataProduct(data);
      });
    }
  }, [id]);

  const formatRP = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
  };

  return (
    <Layout>
      <section className="md:mt-40 w-full mt-32">
        <div className="px-5 md:px-10">
          <h3 className="font-bold text-2xl mb-7 text-gray-800">Detail Product</h3>
          {/* card */}
          {dataProduct !== null && (
            <div className="w-full flex md:flex-row flex-col border shadow-md">
              {/* image */}
              <div className="md:w-96 w-full h-96 relative">
                <Image height={100} width={100} layout="fill" objectFit="cover" quality={80} src={`/api/imageproxy?url=${encodeURIComponent(dataProduct.image_url)}`} alt="Flowbite Logo" />
              </div>
              <div className="flex flex-col flex-1 px-5 py-5">
                {/* title */}
                <div className="flex flex-col grow md:gap-y-8 gap-y-3">
                  <h4 className="text-2xl font-medium text-gray-800">{dataProduct.product_name}</h4>
                  <p className="text-lg">{dataProduct.description}</p>
                  <p className="text-sm text-gray-400 mt-5">Stock : {dataProduct.stock}</p>
                  {/* price */}
                  <h5 className="text-lg font-medium md:-mt-7 -mt-2">Price : {formatRP(dataProduct.price)}</h5>
                </div>
                <div className="flex w-full justify-end">
                  {/* add to cart */}
                  <button className="py-2 px-5 font-semibold bg-orange-400 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-400 hover:text-orange-400 hover:bg-white text-white transition">Add to Cart</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DetailProduct;
