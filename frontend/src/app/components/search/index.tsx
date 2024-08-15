'use client';

import { useState } from "react";
import axios from "../../utils/axios";

type Query = {
  start: { lat: null; lon: null };
  end: { lat: null; lon: null };
};

export default function Search() {

  const [queringDistance, setQueringDistance] = useState(false);
  const [distance, setDistance] = useState(0);

  const calculateDistance = async (event: any) => {
    event.preventDefault();

    setQueringDistance(true);

    const form = event.target;
    const formData = new FormData(form);
    const payload = {
      start: formData.get("start"),
      end: formData.get("end"),
    }
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    if (!payload.start || !payload.end) {
      return;
    }

    

    try {
      const response = await axios.post(`/distance`, payload, options);
      const distance: number = response.data;
      setDistance(distance);
    } catch (error) {
      console.error(error);
    }
  
    setQueringDistance(false);
  };

  return (
    <>
      {queringDistance ? (
        <div>Quering...</div>
      ) : null}
      <div className="mt-5">{distance ? `${distance} meters.` : "No route"}</div>
      <form
        action=""
        onSubmit={calculateDistance}
        className="flex flex-col items-center mt-5 w-4/5"
      >
        <div className="flex flex-col my-5 w-full">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            start point
          </label>
          <input
            type="text"
            name="start"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col my-5 w-full">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            end point
          </label>
          <input
            type="text"
            name="end"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="my-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <button>Calculate</button>
        </div>
      </form>
    </>
  );
}
