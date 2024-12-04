export default function Page() {
    return <div>
<div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
    <div>
        <h3 className="text-lg font-semibold text-slate-800">Size Chart</h3>
        <p className="text-slate-500">Review your suggested size</p>
    </div>
    {/* <div className="mx-3">
        <div className="w-full max-w-sm min-w-[200px] relative">
        <div className="relative">
            <input
            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Search for product..."
            />
            <button
            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
            type="button"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </button>
        </div>
        </div>
    </div> */}
</div>
 
<div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
  <table className="w-full text-left table-auto min-w-max">
    <thead>
      <tr className="border-b border-slate-300 bg-slate-50">
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Product</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Name</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Size</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Bust</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Waist</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Hip</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500"></th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-slate-50">
        <td className="p-4 border-b border-slate-200 py-5">
          <img src="https://assets.burberry.com/is/image/Burberryltd/994C721D-AC59-44CD-AAF1-4B9E914F9181?$BBY_V3_SL_1$&wid=1501&hei=1500" alt="Product 1" className="w-16 h-16 object-cover rounded" />
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="block font-semibold text-sm text-slate-800">Check Wool Silk Dress</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">02</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">30</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">23.5</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">33</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <button type="button" className="text-slate-500 hover:text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </td>
      </tr>
      <tr className="hover:bg-slate-50">
        <td className="p-4 border-b border-slate-200 py-5">
          <img src="https://assets.burberry.com/is/image/Burberryltd/D032042A-4F26-422D-9AE4-68FCF9AD7448?$BBY_V3_SL_1$&wid=1501&hei=1500" alt="Product 1" className="w-16 h-16 object-cover rounded" />
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="block font-semibold text-sm text-slate-800">Cropped Check Cotton Shirt</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">02</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">30</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">23.5</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">33</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <button type="button" className="text-slate-500 hover:text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </td>
      </tr>
      <tr className="hover:bg-slate-50">
        <td className="p-4 border-b border-slate-200 py-5">
          <img src="https://assets.burberry.com/is/image/Burberryltd/2016131B-DCE7-4220-BF03-6A50240103A8?$BBY_V3_SL_1$&wid=1501&hei=1500" alt="Product 1" className="w-16 h-16 object-cover rounded" />
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="block font-semibold text-sm text-slate-800">Wool Mohair Maxi Kilt</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">02</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">30</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">23.5</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">33</p>
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <button type="button" className="text-slate-500 hover:text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
    </div>;
  }
  