import { Veg } from "@/interfaces/Veg";
import GreenCheckMark from "@/ui/GreenCheckMark";
import RedXMark from "@/ui/RedXMark";
import { VEG_CODES } from "@/util";
import React, { useEffect, useRef, useState } from "react";

export default function Vegs() {
  const [vegCodes, setVegCodes] = useState(VEG_CODES);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storageVegs = localStorage.getItem("vegCodes");
    if (storageVegs) {
      const storageVegsIn = JSON.parse(storageVegs).map((veg: Veg) => ({
        ...veg,
        inputValue: "",
      }));
      const sortedVegs = storageVegsIn.sort(
        (v1: Veg, v2: Veg) => v1.correctNum - v2.correctNum
      );
      setVegCodes(sortedVegs);
    }

    inputRefs.current[0]?.focus();
  }, []);

  const reload = () => {
    const vegCodesNoInp = vegCodes.map((veg: Veg) => ({
      ...veg,
      inputValue: "",
    }));
    const sortedVegs = vegCodesNoInp.sort(
      (v1: Veg, v2: Veg) => v1.correctNum - v2.correctNum
    );
    setVegCodes(sortedVegs);
    inputRefs.current[0]?.focus();
  };

  const handleInputChange = (index: number, value: string) => {
    const newVegCodes = [...vegCodes];
    let newCorrectNum = newVegCodes[index].correctNum;

    if (value === newVegCodes[index].code) {
      newCorrectNum += 1;
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    } else if (
      newVegCodes[index].inputValue.length === 2 &&
      newVegCodes[index].inputValue !== newVegCodes[index].code
    ) {
      newCorrectNum -= 1;
    }

    newVegCodes[index] = {
      ...newVegCodes[index],
      correctNum: newCorrectNum,
      inputValue: value,
    };

    localStorage.setItem("vegCodes", JSON.stringify(newVegCodes));
    setVegCodes(newVegCodes);
  };

  const isBtnActive =
    vegCodes.filter((veg) => veg.correctNum == 0).length === 0;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-8 py-8 bg-gray-900 rounded-xl shadow-lg text-white">
      <div className="flex justify-center items-center mb-6">
        <button
          className="bg-yellow hover:bg-yellow-400 text-black px-6 py-3 rounded-md text-lg font-semibold transition-colors duration-300"
          onClick={reload}
        >
          Reload
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {vegCodes.map((vegCode, index) => (
          <li
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-800 px-4 py-3 rounded-md shadow-sm"
          >
            {/* Veg title */}
            <div className="text-base md:text-lg font-medium mb-2 md:mb-0 md:w-1/4">
              {vegCode.title}
            </div>

            {/* Input + Status */}
            <div className="flex flex-row items-center gap-4 w-full md:w-3/4">
              <input
                type="number"
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-32 text-right [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={vegCode.inputValue || ""}
                disabled={vegCode.inputValue === vegCode.code}
                placeholder="Enter code"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />

              {/* Icons */}
              <div className="flex items-center">
                {vegCode.inputValue === vegCode.code && <GreenCheckMark />}
                {vegCode.inputValue.length === 2 &&
                  vegCode.inputValue !== vegCode.code && <RedXMark />}
              </div>

              {/* Correct count */}
              <div className="text-sm md:text-base text-gray-300">
                {vegCode.correctNum}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isBtnActive && (
        <div className="flex justify-center items-center mt-8">
          <button
            className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-md text-lg font-semibold transition-colors duration-300"
            onClick={() => alert("All codes correct!")}
          >
            Submit Codes
          </button>
        </div>
      )}
    </div>
  );
}
