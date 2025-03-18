import React, { useRef, useState } from "react";
import { Trash2 } from "lucide-react";

interface Coin {
  name: string;
  weight: number; // Weight in grams
  value: number;
  image: string;
}

const coins: Coin[] = [
  {
    name: "10 Agorot",
    weight: 4,
    value: 0.1,
    image: "/images/cash/10agorot.png",
  },
  {
    name: "50 Agorot",
    weight: 6.5,
    value: 0.5,
    image: "/images/cash/50agorot.png",
  },
  { name: "1 Shekel", weight: 4, value: 1, image: "/images/cash/1shekel.png" },
  {
    name: "2 Shekels",
    weight: 5.7,
    value: 2,
    image: "/images/cash/2shekels.png",
  },
  {
    name: "5 Shekels",
    weight: 8.2,
    value: 5,
    image: "/images/cash/5shekels.png",
  },
  {
    name: "10 Shekels",
    weight: 7,
    value: 10,
    image: "/images/cash/10shekels.png",
  },
];

type CoinCalculatorProps = {
  setTotal: any;
};

const CoinCalculator = ({ setTotal }: CoinCalculatorProps) => {
  const [selectedCoinIndex, setSelectedCoinIndex] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [coinList, setCoinList] = useState<
    { coin: Coin; weight: number; amount: number; total: number }[]
  >([]);
  const [coinOptions, setCoinOptions] = useState<Coin[]>(coins);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleWeightChange = (value: string) => {
    const newWeight = parseFloat(value) || 0;
    setWeight(newWeight);
    setAmount(Math.floor(newWeight / coinOptions[selectedCoinIndex].weight));
  };

  const handleAmountChange = (value: string) => {
    const newAmount = parseInt(value, 10) || 0;
    setAmount(newAmount);
    setWeight(newAmount * coinOptions[selectedCoinIndex].weight);
  };

  const handleAddCoin = () => {
    const selectedCoin = coinOptions[selectedCoinIndex];
    const total = amount * selectedCoin.value;

    setCoinList([...coinList, { coin: selectedCoin, weight, amount, total }]);

    const updatedCoinOptions = coinOptions.filter(
      (_, ind) => ind !== selectedCoinIndex
    );
    setCoinOptions(updatedCoinOptions);
    setSelectedCoinIndex(0);
    setWeight(0);
    setAmount(0);

    inputRef.current?.focus();
  };

  const handleRemoveCoin = (index: number) => {
    const removedCoin = coinList[index].coin;
    const updatedCoinList = coinList.filter((_, ind) => ind !== index);
    setCoinList(updatedCoinList);

    const updatedCoinOptions = [...coinOptions, removedCoin].sort(
      (c1, c2) => c1.value - c2.value
    );
    setCoinOptions(updatedCoinOptions);
    setSelectedCoinIndex(0);
  };

  const handleFocus = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number
  ) => {
    if (value === 0) {
      setter(0);
    }
  };

  const handleBlur = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number
  ) => {
    if (isNaN(value)) {
      setter(0);
    }
  };

  console.log({ amount });

  const totalValue = coinList.reduce((total, item) => total + item.total, 0);
  setTotal(totalValue);

  return (
    <div className="mx-auto p-4 md:p-8 w-full max-w-4xl bg-gray-900 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Coin Calculator
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Coin Selection */}
        {coinOptions.length > 0 && (
          <div className="flex items-center gap-4 w-full md:w-1/2">
            <img
              src={coinOptions[selectedCoinIndex].image}
              alt={coinOptions[selectedCoinIndex].name}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
              value={selectedCoinIndex}
              onChange={(e) => {
                setSelectedCoinIndex(parseInt(e.target.value, 10));
                setAmount(0);
                setWeight(0);
              }}
            >
              {coinOptions.map((coin, index) => (
                <option key={coin.name} value={index}>
                  {coin.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {/* Weight */}
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="weight">Weight (g):</label>
            <input
              id="weight"
              min={0}
              ref={inputRef}
              type="number"
              value={isNaN(weight) ? "" : weight}
              onFocus={() => handleFocus(setWeight, weight)}
              onBlur={() => handleBlur(setWeight, weight)}
              onChange={(e) => handleWeightChange(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-32 text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
            />
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="amount">Number of Coins:</label>
            <input
              min={0}
              id="amount"
              type="number"
              value={isNaN(amount) ? "" : amount}
              onFocus={() => handleFocus(setAmount, amount)}
              onBlur={() => handleBlur(setAmount, amount)}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-32 text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Add Coin Button */}
      {coinOptions.length > 0 && (
        <button
          className={`mt-6 w-full md:w-auto px-6 py-3 text-lg font-medium rounded-lg ${
            amount === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow text-black hover:bg-yellow-400 transition-colors duration-300"
          }`}
          disabled={amount === 0}
          onClick={handleAddCoin}
        >
          Add Coin to List
        </button>
      )}

      {/* Coin List */}
      <div className="mt-10">
        {coinList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coinList.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 flex flex-col gap-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.coin.image}
                      alt={item.coin.name}
                      className="w-12 h-12 object-contain"
                    />
                    <h3 className="font-semibold">{item.coin.name}</h3>
                  </div>
                  <button
                    onClick={() => handleRemoveCoin(index)}
                    className="bg-red-500 hover:bg-red-400 text-white p-2 rounded-md transition-colors duration-300 flex items-center justify-center"
                    aria-label="Remove coin"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-between text-sm text-gray-300">
                  <p>{item.weight} g</p>
                  <p>{item.amount} coins</p>
                  <p>{item.total.toFixed(2)} ₪</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No coins added yet.</p>
        )}
      </div>

      {/* Total Value */}
      <div className="mt-8 text-center text-2xl font-bold text-yellow-500">
        Total Value: {totalValue.toFixed(2)} ₪
      </div>
    </div>
  );
};

export default CoinCalculator;
