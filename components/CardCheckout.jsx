import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const CardCheckout = ({ data }) => {
  const { product, quantity, unit_price } = data;
  const { handleFunction } = useContext(GlobalContext);
  const { formatRP } = handleFunction;

  return (
    <div className="w-full rounded-lg shadow-md p-3 flex flex-col gap-y-2">
      <p className="text-xs font-bold">
        {product.product_name} <span className="text-xs font-normal">: {quantity} Unit</span>
      </p>
      <p>Total : {formatRP(unit_price)}</p>
    </div>
  );
};

export default CardCheckout;
