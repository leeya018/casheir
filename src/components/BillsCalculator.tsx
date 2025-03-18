import React, { useRef, useState } from "react";

interface Bill {
  name: string;
  value: number;
  image: string;
}

const bills: Bill[] = [
  { name: "20 Shekels", value: 20, image: "/images/cash/20shekels.png" },
  { name: "50 Shekels", value: 50, image: "/images/cash/50shekels.png" },
  { name: "100 Shekels", value: 100, image: "/images/cash/100shekels.png" },
  { name: "200 Shekels", value: 200, image: "/images/cash/200shekels.png" },
];

type BillCalculatorProps = {
  setTotal: any;
};

const BillsCalculator = ({ setTotal }: BillCalculatorProps) => {
  const [selectedBillIndex, setSelectedBillIndex] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [billList, setBillList] = useState<
    { bill: Bill; amount: number; total: number }[]
  >([]);
  const [billOptions, setBillOptions] = useState<Bill[]>(bills);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAmountChange = (value: string) => {
    setAmount(parseInt(value, 10) || 0);
  };

  const handleAddBill = () => {
    const selectedBill = billOptions[selectedBillIndex];
    const total = amount * selectedBill.value;

    setBillList([{ bill: selectedBill, amount, total }, ...billList]);

    const updatedBillOptions = billOptions.filter(
      (_, ind) => ind !== selectedBillIndex
    );
    setBillOptions(updatedBillOptions);
    setSelectedBillIndex(0);
    setAmount(0);

    inputRef.current?.focus();
  };

  const handleRemoveBill = (index: number) => {
    const removedBill = billList[index].bill;
    const updatedBillList = billList.filter((_, ind) => ind !== index);
    setBillList(updatedBillList);

    const updatedBillOptions = [...billOptions, removedBill].sort(
      (b1, b2) => b1.value - b2.value
    );
    setBillOptions(updatedBillOptions);
    setSelectedBillIndex(0);
  };

  const totalSum = billList.reduce((total, item) => total + item.total, 0);
  setTotal(totalSum);

  return (
    <div className="mx-auto p-4 md:p-8 w-full max-w-4xl bg-gray-900 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Bills Calculator
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Bill Selection */}
        {billOptions.length > 0 && (
          <div className="flex items-center gap-4 w-full md:w-1/2">
            <img
              src={billOptions[selectedBillIndex].image}
              alt={billOptions[selectedBillIndex].name}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
              value={selectedBillIndex}
              onChange={(e) => {
                setSelectedBillIndex(parseInt(e.target.value, 10));
                setAmount(0);
              }}
            >
              {billOptions.map((bill, index) => (
                <option key={bill.name} value={index}>
                  {bill.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Amount Input */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="amount">Number of Bills:</label>
            <input
              min={0}
              id="amount"
              ref={inputRef}
              type="number"
              value={isNaN(amount) ? "" : amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-32 text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Add Bill Button */}
      {billOptions.length > 0 && (
        <button
          className={`mt-6 w-full md:w-auto px-6 py-3 text-lg font-medium rounded-lg ${
            amount === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-400 transition-colors duration-300"
          }`}
          disabled={amount === 0}
          onClick={handleAddBill}
        >
          Add Bill to List
        </button>
      )}

      {/* Bill List */}
      <div className="mt-10">
        {billList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {billList.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 flex flex-col gap-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.bill.image}
                      alt={item.bill.name}
                      className="w-12 h-12 object-contain"
                    />
                    <h3 className="font-semibold">{item.bill.name}</h3>
                  </div>
                  <button
                    onClick={() => handleRemoveBill(index)}
                    className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-md transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex justify-between text-sm text-gray-300">
                  <p>{item.amount} bills</p>
                  <p>{item.total.toFixed(2)} ₪</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No bills added yet.</p>
        )}
      </div>

      {/* Total Value */}
      <div className="mt-8 text-center text-2xl font-bold text-yellow-500">
        Total Value: {totalSum.toFixed(2)} ₪
      </div>
    </div>
  );
};

export default BillsCalculator;
