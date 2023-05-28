"use client";

import useSWRMutation from "swr/mutation";

async function performSelect(url: string) {
  await fetch(url, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "include",
  });
}

export default function ActionButton({
  seat_count,
  select_url,
}: {
  seat_count: string;
  select_url: string;
}) {
  const { trigger } = useSWRMutation(select_url, performSelect);

  return (
    <button
      onClick={() => trigger()}
      className="is-small button is-rounded is-outlined is-success"
    >
      {seat_count} Seats
    </button>
  );
}
