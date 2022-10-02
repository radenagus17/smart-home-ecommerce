import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

const Card = ({ data }) => {
  const { product_name, price, stock, category, image_url, id } = data;

  const { state, handleFunction } = useContext(GlobalContext);
  let { user, setUser, setFetchStatus, setFetchCheckoutStatus } = state;
  let { formatRP } = handleFunction;
  let router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [displaySpin, setDisplaySpin] = useState(false);

  const handleQtyMinus = () => quantity > 0 && setQuantity(quantity - 1);
  const handleQtyPlus = () => setQuantity(quantity + 1);

  useEffect(() => {
    if (Cookies.get("token-user") !== undefined) {
      if (user === undefined) {
        setUser(JSON.parse(Cookies.get("user")));
      }
    }
  }, [user, setUser]);

  const handleCheckout = (e) => {
    if (!user) {
      router.push("/user/checkout");
    } else {
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
          setFetchCheckoutStatus(true);
        } catch (error) {
          console.log(error);
        }
      };
      postCheckout();
    }
  };

  const sliceText = (param) => {
    return param === null ? "" : param.slice(0, 25) + "...";
  };

  return (
    <div className="relative border border-gray-100 " style={{ width: "300px" }}>
      <div className="relative object-cover w-full h-56 z-0">
        <Image layout="fill" objectFit="cover" quality={80} src={`/api/imageproxy?url=${encodeURIComponent(image_url)}`} alt="Flowbite Logo" />
      </div>
      <div className="p-6">
        <small>
          <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-r-lg dark:bg-green-200 dark:text-green-900">{category.category_name}</span>
        </small>
        <h5 className="mt-4 ">{sliceText(product_name)}</h5>
        <ul className="mt-5 text-sm font-thin text-gray-500 ">
          <li>Stock : {stock}</li>
          <li className="text-lg font-bold">Harga : {formatRP(price)}</li>
        </ul>
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
          <button className="flex relative justify-center items-center w-full p-4 mt-5 text-sm font-medium text-white bg-orange-300 border rounded-sm" type="button" onClick={handleCheckout}>
            <div role="status" className="absolute inset-x-12">
              <svg aria-hidden="true" className="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <button value={id} className={`block w-full p-4 mt-5 text-sm font-medium text-white bg-orange-400 border rounded-sm`} type="button" onClick={handleCheckout}>
            Add to Cart
          </button>
        )}

        <Link href={`/detail-product/${id}`}>
          <a className="block w-full p-4 mt-2 text-sm font-medium text-center text-orange-400 bg-white border border-orange-500 rounded-sm hover:bg-orange-100 transition" type="button">
            Detail Product
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
