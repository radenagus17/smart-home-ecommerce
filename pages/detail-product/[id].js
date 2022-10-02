import Layout from "../../widget/Layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";

const DetailProduct = () => {
  const router = useRouter();

  const [dataProduct, setDataProduct] = useState(null);
  const { state, handleFunction } = useContext(GlobalContext);
  let { user, setUser, fetchStatus, setFetchStatus } = state;
  let { formatRP } = handleFunction;
  let { id } = router.query;
  const [displaySpin, setDisplaySpin] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const handleQtyMinus = () => quantity > 0 && setQuantity(quantity - 1);
  const handleQtyPlus = () => setQuantity(quantity + 1);

  useEffect(() => {
    let fetchData = async () => {
      try {
        const res = await axios.get("https://service-example.sanbercloud.com/api/product");
        setDataProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }

    if (id !== undefined) {
      axios.get(`https://service-example.sanbercloud.com/api/product/${id}`).then((res) => {
        let data = res.data;
        setDataProduct(data);
      });
    }
    if (Cookies.get("user") !== undefined) setUser(Cookies.get("user"));
  }, [id, user, setUser, fetchStatus, setFetchStatus]);

  const handleCheckout = (e) => {
    if (!user) router.push("/user/checkout");
    else {
      const idProduct = e.target.value;
      let postCheckout = async () => {
        try {
          setDisplaySpin(true);
          await axios.post(
            `https://service-example.sanbercloud.com/api/checkout/${user.id}/${idProduct}`,
            { quantity },
            {
              headers: {
                Authorization: "Bearer" + Cookies.get("token-user"),
              },
            }
          );
          setDisplaySpin(false);
          setFetchStatus(true);
        } catch (error) {
          console.log(error);
        }
      };
      postCheckout();
    }
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
              <div className="md:h-[470px] h-[400px] flex md:justify-center md:items-center justify-start items-start">
                <div className="md:w-96 w-full h-96 relative">
                  <Image layout="fill" objectFit="cover" quality={80} src={`/api/imageproxy?url=${encodeURIComponent(dataProduct.image_url)}`} alt="Flowbite Logo" />
                </div>
              </div>
              <div className="flex flex-col flex-1 px-5 py-5">
                {/* title */}
                <div className="flex flex-col grow md:gap-y-8 gap-y-3 mb-8">
                  <h4 className="text-2xl font-medium text-gray-800">{dataProduct.product_name}</h4>
                  <p className="text-lg">{dataProduct.description}</p>
                  <p className="text-sm text-gray-400 mt-5">Stock : {dataProduct.stock}</p>
                  {/* price */}
                  <h5 className="text-lg font-medium md:-mt-7 -mt-2">Price : {formatRP(dataProduct.price)}</h5>
                </div>
                <div className="flex w-full justify-end">
                  {/* add to cart */}
                  <div className="flex flex-col gap-y-3 w-full md:max-w-xs">
                    {user && (
                      <div className="flex items-center justify-between mt-4 border">
                        <button onClick={handleQtyMinus} className="h-full px-2 text-black bg-gray-200">
                          -
                        </button>
                        <input value={quantity} onChange={() => {}} className="inline-block bg-white w-full h-full text-center focus:outline-none" placeholder="1" />
                        <button onClick={handleQtyPlus} className="h-full px-2 text-black bg-gray-200">
                          +
                        </button>
                      </div>
                    )}
                    {displaySpin ? (
                      <button onClick={handleCheckout} className="relative flex justify-around items-center py-2 px-5 font-semibold bg-orange-300 rounded-2xl text-white">
                        <div role="status" className="absolute inset-x-20">
                          <svg aria-hidden="true" className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                        Add to Cart
                      </button>
                    ) : (
                      <button value={id} onClick={handleCheckout} className={`py-2 px-5 font-semibold bg-orange-400 rounded-2xl text-white`}>
                        Add to Cart
                      </button>
                    )}
                  </div>
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
