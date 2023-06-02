import Link from "next/link";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { PERFORM_SEARCH_API_KEY } from "@/libs/constants";
import ArrivalStand from "@/components/stand/ArrivalStand";
import DepartureStand from "@/components/stand/DepartureStand";

async function getSearchCriteria(searchId: string) {
  let cookieStore = cookies();
  let cookie = cookieStore.get(searchId)?.value || "";

  const resp = await fetch(`${PERFORM_SEARCH_API_KEY}/${searchId}`, {
    headers: new Headers({ Cookie: `${searchId}=${cookie}` }),
  });

  return (await resp.json()) as {
    criteria: { departure_id: string; arrival_id: string };
  };
}

async function getStand(url: string) {
  const resp = await fetch(url);

  return (await resp.json())["stand"] as { id: string; name: string };
}

export default async function Criteria({
  params: { id },
}: {
  params: { id: string };
}) {
  const { criteria } = await getSearchCriteria(id);
  const [arrival, departure] = [
    getStand(criteria["arrival_id"]),
    getStand(criteria["departure_id"]),
  ];

  return (
    <div className="box mt-3" style={{ maxInlineSize: "320px" }}>
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          <p>Your Selection</p>
        </div>

        <div className="column">
          <Link
            href="/"
            className="button is-link is-outlined is-light is-small is-rounded"
          >
            Modify your selection
          </Link>
        </div>
      </div>

      <div className="columns is-multiline">
        <div className="column is-full">
          <Suspense>
            {/*@ts-expect-error */}
            <DepartureStand stand={departure} />
          </Suspense>
        </div>

        <div className="column is-full">
          <Suspense>
            {/*@ts-expect-error */}
            <ArrivalStand stand={arrival} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
