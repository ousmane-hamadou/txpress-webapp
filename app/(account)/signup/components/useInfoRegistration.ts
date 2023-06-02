import { Result } from "@/libs/types";

type Options = {
  arg: {
    owner: string;
    password: string;
    carBrand: string;
    numOfSeats: number;
  };
};

export type Response = {
  id: string;
  _links: {
    self: { href: string };
  };
};

export default async function sendInformation(
  url: string,
  { arg }: Options
): Promise<Result<Response>> {
  const resp = await fetch(url, {
    method: "post",
    credentials: "include",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify({
      owner: arg.owner,
      password: arg.password,
      car_brand: arg.carBrand,
      num_of_seats: arg.numOfSeats,
    }),
  });

  const payload = (await resp.json()) as Response;

  return {
    code: 0,
    errMsg: "",
    hasError: false,
    payload,
  };
}