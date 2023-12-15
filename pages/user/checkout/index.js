import Cookies from "js-cookie";
import { useContext, useEffect, useRef, useState } from "react";
import CardCheckout from "../../../components/CardCheckout";
import { GlobalContext } from "../../../context/GlobalContext";
import Layout from "../../../widget/Layout";
import axios from "axios";
import ModalTransaction from "../../../components/ModalTransaction";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";

const ListCheckout = () => {
  const form = useRef();
  const router = useRouter();

  const { state, handleFunction } = useContext(GlobalContext);
  let { user, setUser, dataCheckoutUser, getCheckoutUser } = state;
  let { fetchCheckoutUser, sumTotal } = handleFunction;
  const [displayModal, setDisplayModal] = useState(false);
  const [input, setInput] = useState({
    message: "",
  });
  const [displaySpin, setDisplaySpin] = useState(false);

  // data
  const [bank, setBank] = useState(null);
  const [optionBankId, setOptionBankId] = useState(-1);

  // indikator
  const [fetchBankStatus, setFetchBankStatus] = useState(true);
  const [fetchCheckoutStatus, setFetchCheckoutStatus] = useState(true);

  useEffect(() => {
    const getArrayCheckout = async () => {
      try {
        let { data } = await axios.get(`https://service-example.sanbercloud.com/api/checkout-product-user/${user.id}`, {
          headers: {
            Authorization: "Bearer" + Cookies.get("token-user"),
          },
        });
        let result = data.filter((res) => res.is_transaction === 0).map((res) => res.product.product_name);

        if (data.length === 0) {
          setInput({ ...input, message: "Tidak ada checkout" });
        } else {
          setInput({
            ...input,
            message: `Anda memiliki transaksi di E-Commerce.id dengan nama product :\n- ${result.join("\n- ")}\n\nDengan total pembayaran : ${sumTotal(data)}\nSilahkan lakukan pembayaran segera dengan bank yang dipilih`,
          });
        }
      } catch (error) {
        setInput({ ...input, message: "Tidak ada checkout" });
        alert(error);
      }
    };

    if (Cookies.get("token-user") !== undefined) {
      if (user == undefined) {
        setUser(JSON.parse(Cookies.get("user")));
      }
    }

    if (user !== undefined) {
      if (fetchCheckoutStatus) {
        fetchCheckoutUser();
        getArrayCheckout();
        setFetchCheckoutStatus(false);
      }
    }

    const getBank = async () => {
      try {
        let { data } = await axios.get("https://service-example.sanbercloud.com/api/bank");
        setBank(data);
      } catch (error) {
        alert(error);
      }
    };

    if (fetchBankStatus) {
      getBank();
      setFetchBankStatus(false);
    }
  }, [user, setUser, fetchCheckoutStatus, setFetchCheckoutStatus, fetchCheckoutUser, fetchBankStatus, input, sumTotal]);

  const handleOption = (e) => {
    setOptionBankId(e.target.value);
  };
  const handleTrans = (e) => {
    e.preventDefault();
    if (optionBankId === -1) alert("pilih bank transaksi kamu!");
    else {
      axios
        .post(
          `https://service-example.sanbercloud.com/api/transaction/${user.id}`,
          { id_bank: optionBankId },
          {
            headers: {
              Authorization: "Bearer" + Cookies.get("token-user"),
            },
          }
        )
        .then((res) => {
          emailjs.sendForm("service_mben9do", "template_aiqywji", form.current, "gUgoTvVLXW8Uv-AAa").then(
            (res) => {
              alert(res.text);
            },
            (error) => {
              alert(error.text);
            }
          );
          setFetchCheckoutStatus(true);
          router.push("/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleButton = () => {
    if (!getCheckoutUser) alert("Anda belum memiliki data checkout");
    else {
      setDisplaySpin(true);
      setTimeout(() => {
        setDisplayModal(!displayModal);
        setDisplaySpin(false);
      }, 1700);
    }
  };

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
                  dataCheckoutUser
                    .filter((res) => {
                      return res.is_transaction === 0;
                    })
                    .map((res) => {
                      return <CardCheckout key={res.id} data={res} />;
                    })}
              </div>
              {dataCheckoutUser !== null && dataCheckoutUser.length === 0 && <span>Tidak ada data checkout</span>}
              <div className="flex flex-col md:flex-row justify-between mt-16">
                <div>
                  <p>Anda melakukan {dataCheckoutUser !== null && getCheckoutUser} produk checkout</p>
                  <h1 className="text-xl font-bold text-gray-700">Total : {dataCheckoutUser !== null && sumTotal(dataCheckoutUser)}</h1>
                </div>
                {displaySpin ? (
                  <button disabled className="py-1 px-6 md:mt-0 mt-5 font-semibold bg-orange-300 rounded-2xl text-white flex relative justify-end items-center w-[150px]">
                    <div role="status" className="absolute inset-x-6">
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
                    Transaksi
                  </button>
                ) : (
                  <button onClick={handleButton} className="py-2 px-5 md:mt-0 mt-5 font-semibold bg-orange-400 rounded-2xl text-white">
                    Transaksi
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {displayModal && <ModalTransaction bank={bank} handleOption={handleOption} optionBankId={optionBankId} setDisplayModal={setDisplayModal} input={input} form={form} handleTransaction={handleTrans} />}
    </Layout>
  );
};

export default ListCheckout;
