import React, { useContext, useEffect, useState } from "react";
import Layout from "../widget/Layout";
import { Category, Product, Card, RecomendedProduct, ButtonSpinner } from "../components";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";

export async function getServerSideProps() {
  try {
    let res = await fetch("http://service-example.sanbercloud.com/api/product");
    let Prod = await res.json();
    let res1 = await fetch("http://service-example.sanbercloud.com/api/category");
    let categ = await res1.json();

    // if (!Prod || !categ) {
    //   return {
    //     notFound: true,
    //   };
    // }

    return {
      props: {
        Prod,
        categ,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default function Home({ Prod, categ }) {
  const [dataProduct, setDataProduct] = useState(Prod);
  const [dataCategory, setDataCategory] = useState(categ);
  const [limit, setLimit] = useState(5);
  const { state } = useContext(GlobalContext);
  const { fetchStatus, setFetchStatus, setFetchTransactionStatus } = state;

  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [idxRandom, setIdxRandom] = useState(null);

  useEffect(() => {
    let fetchData = async () => {
      try {
        const res = await axios.get("https://service-example.sanbercloud.com/api/product");
        setDataProduct(res.data);
      } catch (error) {
        alert(error);
      }
    };
    if (fetchStatus) {
      fetchData();
      // setFetchTransactionStatus(true);
      setFetchStatus(false);
    }

    if (Prod !== undefined) {
      let filter = Prod.filter((res) => res.available === 1);
      let random = Math.floor(Math.random() * filter.length);
      setIdxRandom(random);
    }
  }, [Prod, fetchStatus, setFetchStatus]);

  const handleCounterFilter = () => {
    setDisplaySpinner(true);
    setTimeout(() => {
      setLimit(limit + 5);
      setDisplaySpinner(false);
    }, 1000);
  };

  try {
    return (
      <Layout home>
        <Category data={dataCategory} />;
        <Product>
          <RecomendedProduct data={Prod} idx={idxRandom} />
          <h4 className="text-lg text-gray-800 font-bold mt-10">All Produk</h4>
          <div className="flex gap-10 flex-col md:flex-row flex-wrap mt-6 items-center">
            {dataProduct.length !== 0 &&
              dataProduct
                .filter((item, index) => {
                  return item.available && index < limit;
                })
                .map((item) => {
                  return <Card key={item.id} data={item} />;
                })}
          </div>
        </Product>
        <ButtonSpinner handleCounterFilter={handleCounterFilter} displaySpinner={displaySpinner} />
      </Layout>
    );
  } catch (error) {
    return <p className="p-5">Error API Connection...</p>;
  }
}
