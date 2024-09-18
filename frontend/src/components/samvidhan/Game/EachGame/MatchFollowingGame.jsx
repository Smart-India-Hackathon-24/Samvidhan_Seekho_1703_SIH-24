"use client";
import React, { useEffect, useState } from "react";

// TODO: get this data from the backend
// const preMatchedData = [
//   { statement: "Freedom of Speech", ans: "1st Amendment" },
//   { statement: "Right to Bear Arms", ans: "2nd Amendment" },
//   {statement: "Protection from Unreasonable Searches", ans: "4th Amendment"},

// ];

const preMatchedData = [
  { country: "Freedom of Speech", capital: "1st Amendment" },
  { country: "Right to Bear Arms", capital: "2nd Amendment" },
  {
    country: "Protection from Unreasonable Searches",
    capital: "4th Amendment",
  },
  { country: "Germany", capital: "Berlin" },
  { country: "Japan", capital: "Tokyo" },
];

const shuffleArray = (matchingData) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};

const MatchFollowingGame = () => {
  const [shuffledMatchData, setShuffledMatchData] = useState(preMatchedData);
  const [pairedData, setPairedData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [checked, setChecked] = useState(false);
  const [ansData, setAnsData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]); // To store the selected country
  const [selectedCapital,setSelectedCapital]=useState([]);

  useEffect(() => {
    setShuffledMatchData(shuffleArray(preMatchedData));
  }, []);

  const handleCapitalClick = (match) => {
    const newPairedMatch = [...pairedData, match];
    if (match === selectedMatch) {
      const ansMatch = [...ansData, match];
      setAnsData(ansMatch);
    }
    const capitalMatch=[...selectedCapital,match.capital]
    setSelectedCapital(capitalMatch);

    setPairedData(newPairedMatch);
    console.log(pairedData);
    setSelectedMatch(null);
  };
  const handleCountry=(match)=>{
    setSelectedMatch(match);
    const countryMatch=[...selectedCountry,match.country];
    setSelectedCountry(countryMatch);
    
  }
    

  const isMatched = (match) =>
    ansData.some(
      (pairedMatch) =>
        pairedMatch.country === match.country &&
        pairedMatch.capital === match.capital
    );
    const isSelectedCountry=(match) => selectedCountry.some((selected)=> selected===match.country);

    const isSelectedCapital=(match)=> selectedCapital.some((selected)=> selected===match.capital);


  const win = ansData.length === preMatchedData.length;
  const checkResult = () => {
    setChecked(true);
  };

  const isCorrectMatch = (match) =>
    ansData.some(
      (pairedMatch) =>
        pairedMatch.country === match.country &&
        pairedMatch.capital === match.capital
    );
  return (
    <>
      {checked && win && (
        <h2 className="text-green-500 my-5 flex justify-center">You Win!</h2>
      )}
      <div className="flex gap-5 my-10 justify-center">
        <div className="flex flex-col gap-2">
          {preMatchedData.map((match, index) => (
            //   ${isMatched(match) ? "bg-green-500" : "bg-gray-500"}
            <button
              className={`
                rounded px-4 py-2 text-white font-bold
                hover:bg-gray-700 hover:scale-105 transition ease-in duration-300
                ${selectedMatch == match && "bg-gray-900"}
                ${
                  checked
                    ? isCorrectMatch(match)
                      ? "bg-green-500"
                      : "bg-red-500"
                    : isSelectedCountry(match)
                    ? "bg-gray-900"
                    : "bg-gray-600"
                }
                `}
              // ${selectedMatch === match && !checked ? "bg-gray-900" : "bg-gray-500"}
              // ${selectedMatch === match && "bg-gray-900"}
              // ${
              //     checked
              //       ? isCorrectMatch(match)
              //         ? "bg-green-500"
              //         : "bg-red-500"
              //     :"bg-gray-500"
              //     //   : isMatched(match)
              //     //   ? "bg-green-500"
              //     //   : "bg-gray-500"
              //   }
              key={index}
              onClick={() => handleCountry(match)}
            >
              {match.country}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {shuffledMatchData.map((match, index) => (
            <button
              // ${isMatched(match) ? " bg-green-500 " : "bg-gray-500"}
              className={`
                ${
                  selectedMatch !== null
                    ? "hover:bg-gray-700 hover:scale-105 transition ease-in duration-300"
                    : "cursor-not-allowed"
                }
                 rounded px-4 py-2 text-white font-bold
                 ${
                   checked
                     ? isCorrectMatch(match)
                       ? "bg-green-500"
                       : "bg-red-500"
                     : isSelectedCapital(match)
                     ? "bg-gray-900"
                     : "bg-gray-600"
                 }
  
                                 `}
              //   ${
              //   checked
              //     ? isCorrectMatch(match)
              //       ? "bg-green-500"
              //       : "bg-red-500"
              //       :"bg-gray-500"
              // }
              key={index}
              disabled={selectedMatch === null}
              onClick={() => handleCapitalClick(match)}
            >
              {console.log(isMatched(match) ? "d" : "e")}
              {match.capital}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={checkResult}
        >
          Check Result
        </button>
      </div>
    </>
  );
};

export default MatchFollowingGame;
