import React, { useState } from "react";
import { useEffect } from "react";

export default function DynamicTable() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorHandling, setErrorHandling] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(false);
      try {
        let data = await fetch(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        );
        data = await data.json();
        data = [
          Object.keys(data?.["Time Series (5min)"]),
          Object.values(data?.["Time Series (5min)"]),
        ];
        if (tableData !== []) {
          setIsLoading(true);
        }
        setTableData(data);
      } catch (err) {
        console.log(err);
        setErrorHandling(true);
      }
    }
    fetchData();
  }, []);

  // console.log(tableData);
  return (
    <>
      <div className="overflow-x-auto relative shadow-md ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                DateTime
              </th>
              <th scope="col" className="py-3 px-6">
                Open
              </th>
              <th scope="col" className="py-3 px-6">
                High
              </th>
              <th scope="col" className="py-3 px-6">
                low
              </th>
              <th scope="col" className="py-3 px-6">
                Close
              </th>
              <th scope="col" className="py-3 px-6">
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {errorHandling ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                <td colSpan="6" className="overflow-x-hidden">
                  <button
                    disabled={true}
                    type="button"
                    className="w-full justify-center py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200   focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  inline-flex items-center"
                  >
                    Something went wrong
                  </button>
                </td>
              </tr>
            ) : !isLoading ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                <td colSpan="6" className="overflow-x-hidden">
                  <button
                    disabled={true}
                    type="button"
                    className="w-full justify-center py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200   focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      ></path>
                    </svg>
                    Loading...
                  </button>
                </td>
              </tr>
            ) : (
              tableData[1].map((e, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {tableData[0][i]}
                    </th>
                    <td className="py-4 px-6">{e["1. open"]}</td>
                    <td className="py-4 px-6">{e["2. high"]}</td>
                    <td className="py-4 px-6">{e["3. low"]}</td>
                    <td className="py-4 px-6">{e["4. close"]}</td>
                    <td className="py-4 px-6 ">{e["5. volume"]}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
