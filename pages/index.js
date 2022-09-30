import React, { useState } from "react";
import Head from "next/head";
import Layout from "../widget/Layout";
import { Category, Product, Card, RecomendedProduct, ButtonSpinner } from "../components";

export async function getServerSideProps() {
  let res = await fetch("http://service-example.sanbercloud.com/api/product");
  let Prod = await res.json();
  let res1 = await fetch("http://service-example.sanbercloud.com/api/category");
  let categ = await res1.json();

  if (!Prod || !categ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      Prod,
      categ,
    },
  };
}

export default function Home({ Prod, categ }) {
  const [dataProduct, setDataProduct] = useState(Prod);
  const [dataCategory, setDataCategory] = useState(categ);
  const [limit, setLimit] = useState(5);

  const [displaySpinner, setDisplaySpinner] = useState(false);

  const handleCounterFilter = () => {
    setDisplaySpinner(true);
    setTimeout(() => {
      setLimit(limit + 5);
      setDisplaySpinner(false);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout home>
        <Category data={dataCategory} />;
        <Product>
          <RecomendedProduct data={dataProduct} />
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
    </>
  );
}
