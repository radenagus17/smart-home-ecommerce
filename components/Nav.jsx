import React, { useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { BsCartCheck } from "react-icons/bs";
import Link from "next/link";
import Cookies from "js-cookie";

const Nav = () => {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (Cookies.get("user") !== undefined) setUser(Cookies.get("user"));
  }, [user, setUser]);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token-user");
    window.location = "/";
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex flex items-center justify-between bg-white py-4 px-5 md:px-10">
        <div onClick={() => setOpen(!open)} className="text-3xl text-orange-300 cursor-pointer md:hidden">
          <GiHamburgerMenu />
        </div>
        <div className="cursor-pointer flex items-center">
          <h1 className="text-xl text-orange-400">E-Commerce.id</h1>
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-5 absolute md:static bg-gray-300 md:bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-16 bg-opacity-80" : "top-[-490px] opacity-0 md:opacity-80"
          }`}
        >
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <IoSearchOutline />
              </div>
              <input type="text" className="block p-2 pl-10 md:w-[700px] w-[420px] text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent border-0" placeholder="Search..." />
            </div>
          </li>
          <li className="flex md:hidden">
            <div className="cursor-pointer text-2xl px-4 py-2 text-gray-600 hover:text-orange-400 mr-3">
              <BsCartCheck />
            </div>
            {!user ? (
              <Link href="/auth/user-login">
                <button className="py-2 px-4 bg-orange-400 hover:ring-2 hover:ring-orange-400 hover:bg-white hover:text-orange-400 transition rounded-full text-white">Login</button>
              </Link>
            ) : (
              <button onClick={handleLogout} className="py-2 px-4 bg-orange-400 hover:ring-2 hover:ring-orange-400 hover:bg-white hover:text-orange-400 transition rounded-full text-white">
                Logout
              </button>
            )}
          </li>
        </ul>
        <div className="hidden md:flex items-center">
          <div className="cursor-pointer text-2xl px-4 py-2 text-gray-600 hover:text-orange-400 mr-4 border-r-2 border-r-gray-300">
            <BsCartCheck />
          </div>
          {!user ? (
            <Link href="/auth/user-login">
              <button className="py-2 px-4 bg-orange-400 hover:ring-2 hover:ring-orange-400 hover:bg-white hover:text-orange-400 transition rounded-full text-white">Login</button>
            </Link>
          ) : (
            <button onClick={handleLogout} className="py-2 px-4 bg-orange-400 hover:ring-2 hover:ring-orange-400 hover:bg-white hover:text-orange-400 transition rounded-full text-white">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
