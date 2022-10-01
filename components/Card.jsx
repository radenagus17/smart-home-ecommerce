import Link from "next/link";
import Image from "next/image";

const Card = ({ data }) => {
  const { product_name, price, stock, category, image_url, id } = data;

  const formatRP = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
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

        <div className="flex items-center justify-between mt-4 border">
          <button className="h-full px-2 text-black bg-gray-200">-</button>
          <input className="inline-block w-full h-full text-center focus:outline-none bg-slate-400" placeholder="1" />
          <button className="h-full px-2 text-black bg-gray-200">+</button>
        </div>
        <button className="block w-full p-4 mt-5 text-sm font-medium text-white bg-orange-400 border rounded-sm" type="button">
          Add to Cart
        </button>
        <Link href={`/detail-product/${id}`}>
          <a className="block w-full p-4 mt-2 text-sm font-medium text-center text-orange-400 bg-white border border-orange-500 rounded-sm" type="button">
            Detail Product
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
