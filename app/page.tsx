import SearchForm from "@/components/home/SearchForm";
import { TAXI_RANKS_API_KEY } from "@/libs/constants";

import { TaxiRanks } from "@/libs/types";

async function getTaxiRanks(url: string) {
  return fetch(url, {
    headers: new Headers({ Accept: "application/json" }),
  }).then((res) => res.json() as Promise<TaxiRanks>);
}

export default async function Home() {
  const taxiRanks = await getTaxiRanks(TAXI_RANKS_API_KEY);

  return (
    <main className="container">
      <SearchForm taxiRanks={taxiRanks["taxi_ranks"]} />
    </main>
  );
}
