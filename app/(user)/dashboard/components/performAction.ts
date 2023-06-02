import { Result } from "@/libs/types";

type Options = {
  arg: {
    method: "delete" | "patch";
  };
};

export default async function performAction(
  url: string,
  opts: Options
): Promise<Result<{}>> {
  try {
    const resp = await fetch(url, {
      method: opts.arg.method,
      credentials: "include",
    });

    if (resp.status >= 400) {
      return {
        code: 500,
        hasError: true,
        errMsg: "Sorry, you can't cancel this now, please retry later",
        payload: null,
      };
    }

    return {
      code: 200,
      hasError: false,
      errMsg: "",
      payload: {},
    };
  } catch (error) {
    return {
      code: 500,
      hasError: true,
      errMsg: "Sorry, you can't cancel this now, please retry later",
      payload: null,
    };
  }
}
