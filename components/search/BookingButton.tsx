"use client";

import { PERFORM_SEARCH_API_KEY } from "@/libs/constants";
import useSWR from "swr";

const fetcher = async (id: string) =>
  fetch(`${PERFORM_SEARCH_API_KEY}/${id}`, { credentials: "include" }).then(
    (res) => res.json() as Promise<{ _links: { selection?: string } }>
  );

function useSelection(searchId: string) {
  const { data } = useSWR(searchId, fetcher, { refreshInterval: 1000 });

  return { data };
}

export default function BookingButton({ searchId }: { searchId: string }) {
  const { data } = useSelection(searchId);

  return <>{data?._links.selection && <button>Book your selection</button>}</>;
}
