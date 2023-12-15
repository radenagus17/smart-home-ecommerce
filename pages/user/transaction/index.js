import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import Layout from "../../../widget/Layout";

const Transaction = () => {
  const { state, handleFunction } = useContext(GlobalContext);
  let { user, setUser } = state;
  let { formatRP } = handleFunction;

  //   data
  const [data, setData] = useState(null);

  // indikator
  const [fetchTransactionStatus, setFetchTransactionStatus] = useState(true);

  useEffect(() => {
    if (Cookies.get("token-user") !== undefined) {
      if (user == undefined) {
        setUser(JSON.parse(Cookies.get("user")));
      }
    }

    if (user !== undefined) {
      if (fetchTransactionStatus) {
        axios
          .get(`https://service-example.sanbercloud.com/api/transaction-user/${user.id}`, {
            headers: {
              Authorization: "Bearer" + Cookies.get("token-user"),
            },
          })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => alert(err));
        setFetchTransactionStatus(false);
      }
    }
  }, [user, setUser, fetchTransactionStatus, setFetchTransactionStatus]);

  const handleTransaction = (e) => {
    const idTransaksi = e.target.value;

    axios
      .post(
        `https://service-example.sanbercloud.com/api/transaction-completed/${idTransaksi}/${user.id}`,
        {},
        {
          headers: {
            Authorization: "Bearer" + Cookies.get("token-user"),
          },
        }
      )
      .then(() => setFetchTransactionStatus(true))
      .catch((err) => alert(err));
  };

  const transactionDelete = (e) => {
    const idTransaksi = e.target.value;

    axios
      .delete(`https://service-example.sanbercloud.com/api/transaction/${idTransaksi}`, {
        headers: {
          Authorization: "Bearer" + Cookies.get("token-user"),
        },
      })
      .then(() => setFetchTransactionStatus(true))
      .catch((err) => alert(err));
  };

  return (
    <Layout>
      <section className="md:mt-40 w-full mt-32">
        <div className="px-5 md:px-10 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Transaction</h1>
          <p>Dibawah ini merupakan informasi transaksi anda!</p>
          <p className="text-gray-400 text-base mt-10">Transaksi terdaftar</p>
          {data !== null &&
            data
              .filter((item) => item.status === "Transaksi terdaftar")
              .map((item) => (
                <div key={item.id} className="w-full rounded-lg shadow-md p-3 flex items-center justify-between mt-3">
                  <div className="space-y-1">
                    <p className="text-xs font-bold">
                      {item.status} <span className="text-xs font-normal">: {item.transaction_code}</span>
                    </p>
                    <p>
                      {item.user.name} : {formatRP(item.total)}
                    </p>
                  </div>
                  <button onClick={handleTransaction} value={item.id} className="py-2 px-5 border text-sm border-orange-400 text-orange-400 rounded-full hover:bg-orange-400 hover:text-white transition">
                    Transaksi Selesai
                  </button>
                </div>
              ))}
          <p className="text-gray-400 text-base mt-10">Transaksi selesai</p>
          {data !== null &&
            data
              .filter((item) => item.status === "Transaksi selesai")
              .map((item) => (
                <div key={item.id} className="w-full rounded-lg shadow-md p-3 flex items-center justify-between mt-3">
                  <div className="space-y-1">
                    <p className="text-xs font-bold">
                      {item.status} <span className="text-xs font-normal">: {item.transaction_code}</span>
                    </p>
                    <p>
                      {item.user.name} : {formatRP(item.total)}
                    </p>
                  </div>
                  <button onClick={transactionDelete} value={item.id} className="py-2 px-5 border text-sm border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition">
                    Hapus Transaksi
                  </button>
                </div>
              ))}
        </div>
      </section>
    </Layout>
  );
};

export default Transaction;
