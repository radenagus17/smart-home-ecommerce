import { IoClose } from "react-icons/io5";

const ModalTransaction = ({ bank, optionBankId, handleOption, setDisplayModal, input, form, handleTransaction, removeHtml }) => {
  return (
    <div className="bg-zinc-200 bg-opacity-75 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col bg-white md:w-1/2 w-4/5 bg-opacity-100 px-5 py-4 shadow-lg rounded-xl">
          <div className="flex w-full items-center border-b-slate-400 p-4 justify-between border-b">
            <h1 className="font-semibold text-xl">Pilih Bank Transaksi</h1>
            <a onClick={() => setDisplayModal(false)} className="text-2xl">
              <IoClose />
            </a>
          </div>
          <p className="text-base text-gray-400 my-4">Setelah anda memilih bank, transaksi anda akan diarahkan ke email</p>
          <form onSubmit={handleTransaction} ref={form} className="mb-5">
            <select value={optionBankId} onChange={handleOption} className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 mb-5">
              <option defaultValue={-1}>Choose a Bank</option>
              {bank !== null &&
                bank.map((res) => {
                  return (
                    <option key={res.id} value={res.id}>
                      {res.bank_name}
                    </option>
                  );
                })}
            </select>
            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Identitas Pembeli
            </label>
            <div className="relative mb-4">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                name="user_name"
                type="text"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full pl-10 p-2.5"
                placeholder="Masukkan Nama Anda"
              />
            </div>
            <div className="relative mb-4">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                name="user_email"
                type="email"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full pl-10 p-2.5"
                placeholder="Masukkan Email Anda"
              />
            </div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Message to E-Commerce.id
            </label>
            <textarea
              id="message"
              name="user_message"
              rows={14}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Your message..."
              defaultValue={input.message}
              onChange={() => {}}
            />
            <div className="mt-5 space-x-4">
              <button type="submit" className="text-sm py-2 px-5 bg-orange-400 text-white rounded-lg">
                Kirim
              </button>
              <button onClick={() => setDisplayModal(false)} className="text-sm py-2 px-5 ring-1 ring-inset ring-orange-400 text-orange-400 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTransaction;
