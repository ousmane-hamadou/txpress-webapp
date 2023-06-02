import { Result } from "@/libs/types";

type Options = { arg: { number: string } };

export type Response = {
  id: string;
  _links: {
    next: { href: string };
  };
};

export default async function performNumberRegistration(
  baseUrl: string,
  opts: Options
): Promise<Result<Response>> {
  let resp;

  try {
    resp = await fetch(`${baseUrl}/?number=${opts.arg.number}`, {
      method: "post",
      credentials: "include",
      headers: new Headers({ Accept: "application/json" }),
    });
  } catch (error) {
    return {
      code: 500,
      hasError: true,
      errMsg: "Oops! Something went wrong!",
      payload: null,
    };
  }

  if (resp.status == 400) {
    return {
      code: 400,
      hasError: true,
      errMsg: "Taxi with same number already exists",
      payload: null,
    };
  }

  if (resp.status != 200) {
    return {
      code: 500,
      hasError: true,
      errMsg: "Oops! Something went wrong! Please retry later",
      payload: null,
    };
  }

  const payload = (await resp.json()) as Response;

  return {
    code: 0,
    hasError: false,
    errMsg: "",
    payload,
  };
}
