"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { LOGIN_URL } from "@/libs/constants";
import signIn from "./useSignIn";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export default function SignInForm() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { isMutating, trigger, data } = useSWRMutation(LOGIN_URL, signIn);

  const hasPasswordError =
    data?.hasError && data.payload?.errorOn?.field == "password";
  const hasNumberError =
    data?.hasError && data.payload?.errorOn?.field == "number";

  useEffect(() => {
    if (data && !data.hasError) {
      router.replace("/dashboard");
    }
  }, [data, router]);

  function onPasswordChange(e: ChangeEvent) {
    setPassword(e.target.value);
  }

  function onNumberChange(e: ChangeEvent) {
    setNumber(e.target.value);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await trigger({ password, number });
  }

  if (data && !data.hasError) {
    document.cookie = `self=${data.payload!.data!._links.self.href}`;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="number" className="label">
          Taxi number *
        </label>
        <div className="control">
          <input
            id="number"
            value={number}
            onChange={onNumberChange}
            type="text"
            className={`input ${hasNumberError && "is-danger"}`}
          />
          {hasNumberError && <p className="helper is-danger">{data.errMsg}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="password" className="label">
          Password *
        </label>
        <div className="control">
          <input
            id="password"
            value={password}
            onChange={onPasswordChange}
            type="text"
            className={`input ${hasPasswordError && "is-danger"}`}
            required
          />
          {hasPasswordError && (
            <p className="helper is-danger">{data.errMsg}</p>
          )}
        </div>
      </div>

      <button
        className={`button is-info is-fullwidth ${isMutating && "is-loading"}`}
      >
        Sign in
      </button>
    </form>
  );
}
