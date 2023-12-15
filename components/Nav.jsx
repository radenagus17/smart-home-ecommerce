import React, { useContext, useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { BsCartCheck, BsCardChecklist } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { GlobalContext } from "../context/GlobalContext";

const Nav = () => {
  const [open, setOpen] = useState(false);

  // const [user, setUser] = useState(undefined);
  const { state, handleFunction } = useContext(GlobalContext);
  let { user, setUser, fetchCheckoutStatus, setFetchCheckoutStatus, getCheckoutUser, setFetchTransactionStatus } = state;
  let { fetchCheckoutUser } = handleFunction;

  const [displaySearch, setDisplaySearch] = useState(false);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("token-user") !== undefined) {
      if (user == undefined) {
        setUser(JSON.parse(Cookies.get("user")));
      }
    }

    if (user !== undefined) {
      // setFetchTransactionStatus(true);
      if (fetchCheckoutStatus) {
        fetchCheckoutUser();
        setFetchCheckoutStatus(false);
      }
    }
  }, [search, setSearch, user, setUser, fetchCheckoutStatus, setFetchCheckoutStatus, fetchCheckoutUser]);

  const handleOnSearch = (e) => {
    setDisplaySearch(true);
    setSearch(e.target.value);
    if (search !== "") {
      axios
        .get("http://service-example.sanbercloud.com/api/product")
        .then((res) => {
          let data = res.data.filter((x) => x.available !== 0);
          let searchData = data.filter((x) => {
            return Object.values(x).join(" ").toLowerCase().includes(e.target.value.toLowerCase());
          });
          setDataSearch(searchData);
        })
        .catch((err) => alert(err));
    }
  };

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token-user");
    window.location = "/";
  };

  return (
    <div className="shadow-md w-full top-0 left-0 z-50 fixed">
      <div className="md:flex flex items-center justify-between bg-white py-4 px-5 md:px-10">
        <div onClick={() => setOpen(!open)} className="text-3xl text-orange-300 cursor-pointer md:hidden">
          <GiHamburgerMenu />
        </div>
        <div className="cursor-pointer flex items-center">
          <a onClick={() => router.push("/")} className="text-xl text-orange-400">
            E-Commerce.id
          </a>
        </div>
        <ul
          className={`flex md:flex-row flex-col items-center md:pb-0 pb-5 md:static absolute bg-gray-200 md:bg-white md:z-auto z-[-1] left-0 md:max-w-md w-full justify-center transition-all duration-500 ease-in ${
            open ? "top-16 bg-opacity-80" : "top-[-490px] opacity-0 md:opacity-80"
          }`}
        >
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <IoSearchOutline />
              </div>
              <input
                type="text"
                className="block p-2 pl-10 lg:w-[700px] md:w-[400px] w-[420px] text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent border-0"
                onChange={handleOnSearch}
                value={search}
                placeholder="Search..."
              />
              <div className={`border md:w-full w-[420px] z-50 absolute flex flex-col top-11 overflow-hidden bg-white ${displaySearch ? "max-h-fit p-5 opacity-100" : "max-h-0 p-0 opacity-0"} transition-all ease-out duration-300`}>
                <a
                  onClick={() => {
                    setDisplaySearch(!displaySearch);
                    setSearch("");
                  }}
                  className="text-lg mb-2 inline-block"
                >
                  <ImCross />
                </a>
                {dataSearch.length !== 0 &&
                  dataSearch.map((item) => {
                    const { id, product_name } = item;
                    return (
                      <span key={id} onClick={() => router.push(`/detail-product/${id}`)} className="border-b-2 py-2 block cursor-pointer hover:text-orange-400">
                        {product_name}
                      </span>
                    );
                  })}
              </div>
            </div>
          </li>
          <li className="flex md:hidden w-[420px] justify-start">
            <a onClick={() => router.push("/user/checkout")} className="text-2xl relative px-4 py-2 text-gray-600 hover:text-orange-400 mr-3">
              <div className={`${!fetchCheckoutStatus ? "invisible" : "visible"} text-[11px] leading-3 bg-red-600 text-white absolute rounded-full py-1 px-1 -top-1 right-1`}>{getCheckoutUser}</div>
              <BsCartCheck />
            </a>
            {!user ? (
              <Link href="/auth/user-login">
                <button className="py-2 px-4 bg-orange-400 hover:ring-2 hover:ring-orange-400 hover:bg-white hover:text-orange-400 transition rounded-full text-white">Login</button>
              </Link>
            ) : (
              <>
                <a onClick={() => router.push("/user/transaction")} className="text-2xl px-4 py-2 text-gray-600 hover:text-orange-400 -ml-3 mr-4">
                  <BsCardChecklist />
                </a>
                <button onClick={handleLogout} className="py-2 px-4 bg-orange-400 hover:ring-2 hover:ring-orange-400 hover:bg-white hover:text-orange-400 transition rounded-full text-white">
                  Logout
                </button>
              </>
            )}
          </li>
        </ul>
        <div className="hidden md:flex items-center">
          <a onClick={() => router.push("/user/checkout")} className="text-2xl relative px-4 py-2 text-gray-600 hover:text-orange-400 mr-4 border-r-2 border-r-gray-300">
            <div className={`${!getCheckoutUser ? "invisible" : "visible"} text-[11px] leading-3 bg-red-600 transition-all text-white absolute rounded-full py-1 px-1 -top-1 right-1`}>{getCheckoutUser}</div>
            <BsCartCheck />
          </a>
          {!user ? (
            <Link href="/auth/user-login">
              <button className="py-2 px-4 bg-orange-400 hover:ring-2 hover:ring-orange-400 hover:bg-white hover:text-orange-400 transition rounded-full text-white">Login</button>
            </Link>
          ) : (
            <>
              <a onClick={() => router.push("/user/transaction")} className="text-2xl px-4 py-2 text-gray-600 hover:text-orange-400 -ml-3 mr-4">
                <BsCardChecklist />
              </a>
              <button onClick={handleLogout} className="py-2 px-4 bg-orange-400 hover:ring-2 hover:ring-orange-400 hover:bg-white hover:text-orange-400 transition rounded-full text-white">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
