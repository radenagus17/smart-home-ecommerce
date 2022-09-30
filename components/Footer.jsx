const Footer = ({ home }) => {
  return (
    <>
      {!home ? (
        <footer class="px-5 bg-white text-center rounded-lg shadow md:flex md:items-center md:justify-between md:px-10 py-6 md:py-8 mt-[25vh]">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022{" "}
            <a href="" class="hover:underline">
              E-Commerce™
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center justify-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </footer>
      ) : (
        <footer class="px-5 bg-white text-center rounded-lg shadow md:flex md:items-center md:justify-between md:px-10 py-6 md:py-8">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022{" "}
            <a href="" class="hover:underline">
              E-Commerce™
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center justify-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </footer>
      )}
    </>
  );
};

export default Footer;
