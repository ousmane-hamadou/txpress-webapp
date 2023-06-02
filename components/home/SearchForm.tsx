"use client";

import useSWRMutation from "swr/mutation";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { PERFORM_SEARCH_API_KEY } from "@/libs/constants";

type Criteria = {
  departureId: string;
  arrivalId: string;
};

type Options = {
  arg: Criteria;
};

async function performSearch(url: string, options: Options) {
  const { arg } = options;
  const data = {
    arrival_id: arg.arrivalId,
    departure_id: arg.departureId,
  };
  const headers = new Headers({ "Content-Type": "application" });

  return await fetch(url, {
    method: "post",
    headers,
    credentials: "include",
    body: JSON.stringify(data),
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

type TagsProps = {
  tags: { id: string; name: string }[];
  onSelect: (id: string) => void;
};

function Tags(props: TagsProps) {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.getAttribute("id") || "";
    props.onSelect(id);
  };

  return (
    <div className="tags">
      {props.tags.map(({ id, name }) => (
        <span
          key={id}
          id={id}
          onClick={onClick}
          className="tag is-clickable is-white"
        >
          {name}
        </span>
      ))}
    </div>
  );
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
    <form className="columns is-multiline">
      <div className="column is-6">
        <div className="field">
          <div className="control">
            <input
              className="input is-white"
              value={departure}
              onChange={handleDeparture}
              type="text"
              placeholder="Choise your departure"
            />
          </div>
        </div>

        <Tags tags={taxiRanks} onSelect={(id) => {}} />
      </div>

      <div className="column is-6">
        <div className="field">
          <div className="control">
            <input
              className="input"
              value={arrival}
              onChange={handleArrival}
              type="text"
              placeholder="Choise your arrival"
            />
          </div>
        </div>
        <Tags tags={taxiRanks} onSelect={(id) => {}} />
      </div>

      <div className="column is-offset-4 is-4">
        <button
          className={`button is-rounded is-link is-fullwidth ${
            isMutating && "is-loading"
          }`}
          type="submit"
          onClick={performSearch}
        >
          Search
        </button>
      </div>
    </form>
  );
}
