import { Owner } from "./types";
import userId from "./userId";

export function preFetchTaxiOwner() {
  void getTaxiOwner();
}

export default async function getTaxiOwner() {
  const [id, cookie, author] = userId();

  if (!id) return null;

  const resp = await fetch(author!, {
    headers: new Headers({ Cookie: `${id}=${cookie}` }),
  });

  if (resp.status != 200) throw new Error("an error occurred on calling api");

  return (await resp.json()) as Owner;
}
