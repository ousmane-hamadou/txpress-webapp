import { Result } from "@/libs/types";

type Options = {
  arg: {
    departureId: string;
    arrivalId: string;
    departureSchedule: string;
  };
};

type Response = {};

export default async function startJourney(
  url: string,
  opts: Options
): Promise<Result<Response>> {
  try {
    const { arg } = opts;

    const resp = await fetch(url, {
      method: "post",
      credentials: "include",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        departure_id: arg.departureId,
        arrival_id: arg.arrivalId,
        departure_schedule: arg.departureSchedule,
      }),
    });

    if (resp.status == 400) {
      return {
        code: 400,
        errMsg: (await resp.json())["error_description"] as string,
        hasError: true,
        payload: {},
      };
    }

    if (resp.status != 201) {
      return {
        code: 500,
        errMsg: "Oops! Somethings went wrong... Please reload page and retry",
        hasError: true,
        payload: {},
      };
    }
    return {
      code: 200,
      errMsg: "",
      hasError: false,
      payload: {},
    };
  } catch (error) {
    console.log(error);

    return {
      code: 500,
      errMsg: "Oops! Somethings went wrong... Please reload page and retry",
      hasError: true,
      payload: {},
    };
  }
}
