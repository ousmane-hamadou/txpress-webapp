"use client";

import useSWRMutation from "swr/mutation";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { PERFORM_SEARCH_API_KEY } from "@/libs/constants";

async function performSearch(
  url: string,
  { arg }: { arg: { departureId: string; arrivalId: string } }
) {
  return await fetch(url, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "include",
    body: JSON.stringify({
      arrival_id: arg.arrivalId,
      departure_id: arg.departureId,
    }),
  }).then((res) => res.json() as Promise<{ id: string }>);
}

function usePerformSearch() {
  const { trigger, isMutating } = useSWRMutation(
    PERFORM_SEARCH_API_KEY,
    performSearch
  );

  return {
    trigger,
    isMutating,
  };
}

export default function SearchForm({
  taxiRanks,
}: {
  taxiRanks: { id: string; name: string }[];
}) {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const router = useRouter();

  const { trigger, isMutating } = usePerformSearch();

  async function performSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const res = await trigger({
      departureId: taxiRanks.find(({ name }) => departure == name)?.id || "",
      arrivalId: taxiRanks.find(({ name }) => arrival == name)?.id || "",
    });

    router.push(`/search/${res?.id || ""}`);
  }

  function handleDeparture(e: React.ChangeEvent<HTMLInputElement>) {
    setDeparture(e.target.value);
  }

  function handleArrival(e: React.ChangeEvent<HTMLInputElement>) {
    setArrival(e.target.value);
  }

  function onDepartureClick(v: string) {
    setDeparture(v);
  }

  function onArrivalClick(v: string) {
    setArrival(v);
  }

  return (
    <form className="column is-8 is-offset-2">
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="departure" className="label">
              Departure
            </label>
            <input
              className="input is-medium"
              value={departure}
              onChange={handleDeparture}
              type="text"
              id="departure"
            />
          </div>

          <div className="tags">
            {taxiRanks.map(({ id, name }) => (
              <span
                onClick={() => onDepartureClick(name)}
                className="tag is-clickable"
                key={id}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label htmlFor="arrival" className="label">
              Arrival
            </label>
            <input
              className="input is-medium"
              value={arrival}
              onChange={handleArrival}
              type="text"
              id="arrival"
            />
          </div>
          <div className="tags">
            {taxiRanks.map(({ id, name }) => (
              <span
                onClick={() => onArrivalClick(name)}
                className="tag is-clickable"
                key={id}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="column is-offset-3 is-6">
        <button
          className={`button is-rounded is-dark is-fullwidth ${
            isMutating && "is-loading"
          }`}
          type="submit"
          disabled={departure.trim().length == 0 || arrival.trim().length == 0}
          onClick={performSearch}
        >
          Search
        </button>
      </div>
    </form>
  );
}
