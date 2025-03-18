"use client";
import BillsCalculator from "@/components/BillsCalculator";
import Vegs from "@/components/Vegs";
import CoinCalculator from "@/components/CoinCalculator";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PaperCalculator from "@/components/PaperCalculator";

function CashView() {
  const [chosen, setChosen] = useState<string>("cash_count");
  const [totalCoinSum, setTotalCoinSum] = useState<number>(0);
  const [totalBillsSum, setTotalBillsSum] = useState<number>(0);
  const [totalPaperSum, setTotalPaperSum] = useState<number>(0);

  console.log({ totalCoinSum, totalBillsSum, totalPaperSum });

  const total = totalCoinSum + totalBillsSum + totalPaperSum;
  return (
    <div>
      <div className="container min-h-screen p-10 bg-black">
        <h1 className="flex justify-center mt-14 text-3xl text-white ">
          cash page
        </h1>

        <div className="flex items-center justify-center gap-10 mt-10 text-xl font-semibold text-white">
          <button
            className={`${
              chosen === "cash_count" && "bg-yellow p-5 rounded-xl text-black"
            }  px-3 py-2 bg-gray-900 rounded-xl`}
            onClick={() => setChosen("cash_count")}
          >
            cash count
          </button>
          <button
            className={`${
              chosen === "codes" && "bg-yellow p-5 rounded-xl text-black"
            }  px-3 py-2 bg-gray-900 rounded-xl`}
            onClick={() => setChosen("codes")}
          >
            codes
          </button>
        </div>
        {chosen === "cash_count" && (
          <div>
            <CoinCalculator setTotal={setTotalCoinSum} />
            <BillsCalculator setTotal={setTotalBillsSum} />
            <PaperCalculator setTotal={setTotalPaperSum} />
            <br />
            <div className="border-t-2 text-white text-xl font-semibold">
              total all: {total} ₪
            </div>
            <br />
            <br />
          </div>
        )}

        {chosen === "codes" && <Vegs />}
      </div>
    </div>
  );
}

export default CashView;
