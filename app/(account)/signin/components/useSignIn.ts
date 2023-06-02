import { Result } from "@/libs/types";

type Options = {
  arg: { password: string; number: string };
};

type APIData = {
  number: string;
  _links: {
    self: {
      href: string;
    };
  };
};

export type Response = {
  data?: APIData;
  errorOn?: {
    field: "password" | "number";
  };
};

export default async function signIn(
  url: string,
  opts: Options
): Promise<Result<Response>> {
  const resp = await fetch(url, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "include",
    body: JSON.stringify(opts.arg),
  });

  if (resp.status == 400) {
    const payload = (await resp.json()) as { error_description: string };

    if (payload.error_description.match(/password/)) {
      return {
        code: 400,
        errMsg: "The password is incorrect",
        hasError: true,
        payload: { errorOn: { field: "password" } },
      };
    }

    return {
      code: 400,
      errMsg: "The taxi registration number is incorrect",
      hasError: true,
      payload: { errorOn: { field: "number" } },
    };
  }

  const data = (await resp.json()) as APIData;

  return {
    code: 0,
    errMsg: "",
    hasError: false,
    payload: {
      data,
    },
  };
}
