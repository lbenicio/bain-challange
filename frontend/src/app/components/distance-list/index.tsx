"use client";

import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export default function DistanceList() {
  const [queringDistance, setQueringDistance] = useState(false);
  const [distances, setDistances] = useState([]);
  const listDistances = async (event: any) => {
    if (event) {
      event.preventDefault();
    }
    

    setQueringDistance(true);

    try {
      const response = await axios.get(
        `/distance`,
      );
      const distances = response.data;
      setDistances(distances);
    } catch (error) {
      console.error(error);
    }

    setQueringDistance(false);
  };

  useEffect(() => {
    if (!distances.length) {
      listDistances(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {queringDistance ? <div>Quering...</div> : null}
      <button
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10"
        onClick={listDistances}
      >
        Get distances
      </button>
      <ul className="flex flex-col items-center justify-center w-4/5 my-5">
        {distances.map((distance: any) => (
          <li
            key={distance.id}
            className="flex flex-row items-center justify-center w-4/5 my-5"
          >
            <div className="flex flex-col">
              <span className="mr-3">Start:</span>
              <span>{distance.from}</span>
            </div>
            <div className="flex flex-col">
              <span className="mr-3">End:</span>
              <span>{distance.to}</span>
            </div>
            <div className="flex flex-row">
              <span className="mr-3">Distance</span>
              <span>{distance.distance} meters</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}