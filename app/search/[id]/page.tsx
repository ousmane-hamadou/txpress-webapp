import { cookies } from "next/headers";

import Taxi from "@/components/search/taxis/Taxi";
import { PERFORM_SEARCH_API_KEY } from "@/libs/constants";
import ActionButtons from "@/components/search/taxis/ActionButtons";
import BookingButton from "@/components/search/BookingButton";

async function getTaxis(searchId: string) {
  let cookieStore = cookies();
  let cookie = cookieStore.get(searchId)?.value || "";

  const resp = await fetch(`${PERFORM_SEARCH_API_KEY}/${searchId}`, {
    headers: new Headers({ Cookie: `${searchId}=${cookie}` }),
  });

  if (resp.status != 200) {
    return { taxis: [] };
  }

  const payload = (await resp.json()) as {
    _links: { taxis: { href: string } };
  };

  return fetch(payload._links.taxis.href, {
    headers: new Headers({ Cookie: `${searchId}=${cookie}` }),
  }).then(
    async (res) =>
      (await res.json()) as {
        taxis: {
          number: string;
          brand: string;
          available_seats: number;
          departure_schedule: string;
          _links: {
            select: { [key: string]: { href: string } };
          };
        }[];
      }
  );
}

export default async function TaxiList({
  params: { id },
}: {
  params: { id: string };
}) {
  const { taxis } = await getTaxis(id);

  if (taxis.length == 0) {
    return (
      <div className="hero is-warning mt-3">
        <div className="hero-body">
          <p className="title">Search Taxis</p>
          <p className="subtitle">No available taxis for this searches</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-3">
      <div className="block">
        <BookingButton searchId={id} />
      </div>

      <div className="block">
        {taxis.map((taxi) => (
          <Taxi
            key={taxi.number}
            taxi={taxi}
            actions={<ActionButtons seats={taxi._links.select} />}
          />
        ))}
      </div>
    </div>
  );
}
