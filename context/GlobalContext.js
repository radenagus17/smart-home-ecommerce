import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  // state
  const [user, setUser] = useState(undefined);
  const [getCheckoutUser, setGetCheckoutUser] = useState(0);
  const [dataCheckoutUser, setDataCheckoutUser] = useState(null);

  // indikator
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchCheckoutStatus, setFetchCheckoutStatus] = useState(true);

  const sumTotal = (param) => {
    let getUnitPrice = param
      .filter((res) => {
        return res.is_transaction === 0;
      })
      .map((res) => res.unit_price);

    const unitPrice = getUnitPrice.map(Number);
    let result = unitPrice.reduce((a, b) => a + b, 0);

    return formatRP(result);
  };

  const fetchCheckoutUser = async () => {
    try {
      let { data } = await axios.get(`https://service-example.sanbercloud.com/api/checkout-product-user/${user.id}`, {
        headers: {
          Authorization: "Bearer" + Cookies.get("token-user"),
        },
      });
      setGetCheckoutUser(data.length);
      setDataCheckoutUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatRP = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
  };

  const handleFunction = {
    fetchCheckoutUser,
    sumTotal,
    formatRP,
  };

  const state = {
    user,
    setUser,
    fetchStatus,
    setFetchStatus,
    fetchCheckoutStatus,
    setFetchCheckoutStatus,
    dataCheckoutUser,
    getCheckoutUser,
  };

  return <GlobalContext.Provider value={{ state, handleFunction }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
