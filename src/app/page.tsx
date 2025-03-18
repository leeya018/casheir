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
    <div className="min-h-screen bg-black text-white">
      {/* Container */}
      <div className="container mx-auto px-4 md:px-10 py-10 max-w-7xl">
        {/* Title */}
        <h1 className="flex justify-center mt-14 text-3xl md:text-5xl font-bold">
          Cash Reconciliation{" "}
        </h1>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-5 md:gap-10 mt-10 text-lg md:text-xl font-semibold">
          {/* <button
            className={`transition-all ${
              chosen === "cash_count"
                ? "bg-yellow text-black p-4 md:p-5 rounded-xl"
                : "bg-gray-900 text-white"
            } px-3 py-2 md:px-4 md:py-3 rounded-xl`}
            onClick={() => setChosen("cash_count")}
          >
            Cash Count
          </button> */}
          {/* <button
            className={`transition-all ${
              chosen === "codes"
                ? "bg-yellow text-black p-4 md:p-5 rounded-xl"
                : "bg-gray-900 text-white"
            } px-3 py-2 md:px-4 md:py-3 rounded-xl`}
            onClick={() => setChosen("codes")}
          >
            Codes
          </button> */}
        </div>

        {/* Content */}
        <div className="mt-10">
          {chosen === "cash_count" && (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left side */}
              <div className="flex-1 space-y-6">
                <CoinCalculator setTotal={setTotalCoinSum} />
                <BillsCalculator setTotal={setTotalBillsSum} />
                <PaperCalculator setTotal={setTotalPaperSum} />
              </div>

              {/* Right side summary */}
              <div className="flex-1 bg-gray-800 rounded-xl p-6 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Total Summary
                </h2>
                <p className="text-xl md:text-2xl">Total All: {total} ₪</p>
              </div>
            </div>
          )}

          {/* {chosen === "codes" && <Vegs />} */}
        </div>
      </div>
    </div>
  );
}

export default CashView;
