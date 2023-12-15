import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>E-Commerce | 404</title>
        <meta name="description" content="Homepad murah, DISKON 75%, mudah dibawa kemana-mana" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="HTML, CSS, JavaScript, Product, Ecommerce" />
        <meta name="author" content="R. Agus Iman Sudrajat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex w-full justify-center items-center">
        <h1 className="text-4xl font-semibold text-red-500">404 - Page Not Found</h1>;
      </div>
    </>
  );
}
