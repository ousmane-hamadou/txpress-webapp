"use client";

import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { REGISTRATION_URL } from "@/libs/constants";
import performNumberRegistration from "./performRegNumberRegistration";

export default function RegNumberForm() {
  const [regNumber, setNumber] = useState("");
  const router = useRouter();
  const {
    isMutating,
    trigger,
    data: response,
  } = useSWRMutation(REGISTRATION_URL, performNumberRegistration);

  useEffect(() => {
    if (response && !response.hasError) {
      router.refresh();
    }
  }, [router, response]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNumber(e.target.value);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await trigger({ number: regNumber });
  };

  if (response && !response.hasError) {
    document.cookie = `next=${response!.payload!._links.next.href}`;
  }

  return (
    <form>
      <div className="field">
        <label htmlFor="taxi-number" className="label">
          Enter your taxi number *
        </label>
        <div className="control">
          <input
            type="text"
            minLength={8}
            maxLength={8}
            value={regNumber}
            onChange={onChange}
            className={`input ${
              response && response.code == 400 ? "is-danger" : "is-info"
            }`}
            placeholder="Ex: AD7878GS"
          />
        </div>
        <div className="helper is-danger">
          {response && response.code == 400 && <p>{response.errMsg}</p>}
        </div>
      </div>

      <button
        onClick={onClick}
        type="submit"
        className={`button is-info is-fullwidth ${isMutating && "is-loading"}`}
      >
        Continue
      </button>
    </form>
  );
}
