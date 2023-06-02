import { TAXI_RANKS_URL } from "./constants";
import { TaxiRanks } from "./types";

export function preFetchTaxiRanks() {
  void getTaxiRanks();
}

export default async function getTaxiRanks() {
  const resp = await fetch(TAXI_RANKS_URL);

  return (await resp.json()) as TaxiRanks;
}
