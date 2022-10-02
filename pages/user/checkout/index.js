import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import CardCheckout from "../../../components/CardCheckout";
import { GlobalContext } from "../../../context/GlobalContext";
import Layout from "../../../widget/Layout";

const ListCheckout = () => {
  const { state, handleFunction } = useContext(GlobalContext);
  let { user, setUser, fetchCheckoutStatus, setFetchCheckoutStatus, dataCheckoutUser } = state;
  let { fetchCheckoutUser, sumTotal } = handleFunction;

  useEffect(() => {
    if (Cookies.get("token-user") !== undefined) {
      if (user == undefined) {
        setUser(JSON.parse(Cookies.get("user")));
      }
    }

    if (user !== undefined) {
      if (fetchCheckoutStatus) {
        fetchCheckoutUser();
        setFetchCheckoutStatus(false);
      }
    }
  }, [user, setUser, fetchCheckoutStatus, setFetchCheckoutStatus, fetchCheckoutUser]);

  return (
    <Layout>
      <section className="md:mt-40 w-full mt-32">
        <div className="px-5 md:px-10 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Checkout Product</h1>
          <p>Dibawah ini merupakan checkout yang anda pilih, silahkan selesaikan transaksi</p>
          <div className="mt-10">
            <div className="w-full overflow-hidden border rounded-lg shadow-lg p-5">
              <div className="flex flex-col gap-y-5">
                {dataCheckoutUser !== null &&
                  dataCheckoutUser.map((res) => {
                    return <CardCheckout key={res.id} data={res} />;
                  })}
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-16">
                <div>
                  <p>Anda melakukan {dataCheckoutUser !== null && dataCheckoutUser.length} produk checkout</p>
                  <h1 className="text-xl font-bold text-gray-700">Total : {dataCheckoutUser !== null && sumTotal(dataCheckoutUser)}</h1>
                </div>
                <button className="py-2 px-5 md:mt-0 mt-5 font-semibold bg-orange-400 rounded-2xl text-white">Transaksi</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ListCheckout;
