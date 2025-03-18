import React, { useRef, useState } from "react";

type PaperCalculatorProps = {
  setTotal: any;
};

const PaperCalculator = ({ setTotal }: PaperCalculatorProps) => {
  const [sumList, setSumList] = useState<number[]>([]);
  const [newSum, setNewSum] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (newSum === 0) return;
    setSumList((prev) => [...prev, newSum]);
    setNewSum(0);
    inputRef.current?.focus();
  };

  const reverseList = () => [...sumList].reverse();

  const total = sumList.reduce((acc, item) => acc + item, 0);
  setTotal(total);

  return (
    <div className="mx-auto p-4 md:p-8 w-full max-w-4xl bg-gray-900 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center capitalize">
        Paper Calculator
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Add Sum Input Section */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <label htmlFor="sum" className="text-lg md:text-xl font-medium">
            Add Sum:
          </label>

          <input
            id="sum"
            className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-32 text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={newSum}
            onChange={(e) => setNewSum(parseInt(e.target.value, 10) || 0)}
            ref={inputRef}
            min={0}
            max={10000}
            placeholder="Enter amount"
          />

          <button
            className={`w-full md:w-auto px-6 py-3 text-lg font-medium rounded-lg transition-colors duration-300 ${
              newSum === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow text-black "
            }`}
            disabled={newSum <= 0}
            onClick={handleClick}
          >
            Add
          </button>
        </div>

        {/* List Section */}
        <div className="w-full md:w-1/2">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
            Added Sums
          </h3>

          <ul className="space-y-2">
            {reverseList().map((sum, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-md shadow-sm"
              >
                <span className="text-sm md:text-base">{index + 1}.</span>
                <span className="text-lg md:text-xl font-medium">{sum} ₪</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <p className="text-xl md:text-2xl font-bold text-yellow-500">
          Total: {total} ₪
        </p>
      </div>
    </div>
  );
};

export default PaperCalculator;
