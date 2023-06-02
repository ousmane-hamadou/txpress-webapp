import { Journey } from "./types";
import userId from "./userId";

export default async function getTrips(url: string) {
  const [id, c] = userId();

  return fetch(url, {
    credentials: "include",
    headers: new Headers({ Accept: "application/json", Cookie: `${id}=${c}` }),
  }).then((res) => res.json() as Promise<{ trips: Journey[] }>);
}
