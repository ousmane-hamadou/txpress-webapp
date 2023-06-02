import { Journey, Result } from "@/libs/types";

import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Result<Journey>, string> = async (url) => {
  try {
    const resp = await fetch(url, {
      credentials: "include",
      headers: new Headers({ Accept: "application/json" }),
    });

    if (resp.status != 200) {
      return {
        code: resp.status,
        hasError: true,
        errMsg: "This values are outdated",
        payload: null,
      };
    }

    return {
      code: 200,
      hasError: false,
      errMsg: "",
      payload: (await resp.json()) as Journey,
    };
  } catch (error) {
    return {
      code: 500,
      hasError: true,
      errMsg: "This values are outdated",
      payload: null,
    };
  }
};

export default function useInProgressJourneyDetails(url: string) {
  const { isLoading, data, error } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });

  return {
    isLoading,
    data,
    error,
  };
}
