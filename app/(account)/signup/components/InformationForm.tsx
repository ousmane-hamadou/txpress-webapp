"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useEffect, useState, createRef } from "react";

import sendInformation from "./useInfoRegistration";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
  next: string;
};

export default function InformationForm({ next }: Props) {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [seats, setSeats] = useState(2);
  const [owner, setOwner] = useState({ firstName: "", lastName: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState({
    isCorrect: true,
    value: "",
  });
  const {
    trigger,
    isMutating,
    data: result,
  } = useSWRMutation(next, sendInformation);

  let confirmPwdRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (result && !result.hasError) {
      router.replace("/dashboard");
    }
  }, [result, router]);

  function onLastNameChange(e: ChangeEvent) {
    setOwner((state) => ({
      firstName: state.firstName,
      lastName: e.target.value,
    }));
  }
  function onFirstNameChange(e: ChangeEvent) {
    setOwner((state) => ({
      firstName: e.target.value,
      lastName: state.lastName,
    }));
  }
  function onSeatsChange(e: ChangeEvent) {
    setSeats(e.target.value == "" ? 0 : Number.parseInt(e.target.value));
  }
  function onConfirmPasswordChange(e: ChangeEvent) {
    setConfirmPassword({
      isCorrect: password != e.target.value,
      value: e.target.value,
    });
  }

  const onBrandChange = (e: ChangeEvent) => setBrand(e.target.value);
  const onPasswordChange = (e: ChangeEvent) => setPassword(e.target.value);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmPassword.isCorrect) {
      confirmPwdRef.current?.focus();
      setConfirmPassword({ isCorrect: false, value: confirmPassword.value });
      return;
    }

    await trigger({
      carBrand: brand,
      numOfSeats: seats,
      owner: `${owner.firstName} ${owner.lastName}`,
      password,
    });
  }

  if (result && !result.hasError) {
    document.cookie = "next='';max-age=0;SameSite=Strict";
    document.cookie = `self=${result.payload?._links.self.href};SameSite=Strict`;
  }

  function navigateToSignIn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    document.cookie = "next='';max-age=0;SameSite=Strict";
    router.push("/signin");
  }

  function abortRegistration(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    document.cookie = "next='';max-age=0;SameSite=Strict";
    router.replace("/");
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="block">
        <div className="columns">
          <div className="column is-6">
            <div className="columns is-mobile">
              <div className="column is-half">
                <div className="field">
                  <label htmlFor="firstName" className="label">
                    First name *
                  </label>

                  <div className="control">
                    <input
                      value={owner.firstName}
                      onChange={onFirstNameChange}
                      id="firstName"
                      type="text"
                      className="input is-info"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="column is-half">
                <div className="field">
                  <label htmlFor="lastName" className="label">
                    Last name *
                  </label>
                  <div className="control">
                    <input
                      id="lastName"
                      type="text"
                      value={owner.lastName}
                      onChange={onLastNameChange}
                      className="input is-info"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="content">
          <p className="subtitle is-5 has-text-info">
            Information on your taxi
          </p>
        </div>
        <div className="columns">
          <div className="column is-6">
            <div className="columns is-mobile">
              <div className="column is-three-fifths">
                <div className="field">
                  <label htmlFor="brand" className="label">
                    Brand *
                  </label>
                  <div className="control">
                    <input
                      id="brand"
                      type="text"
                      value={brand}
                      onChange={onBrandChange}
                      className="input is-info"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="column is-two-fifths">
                <div className="field">
                  <label htmlFor="place" className="label">
                    Place *
                  </label>
                  <div className="control">
                    <input
                      id="place"
                      type="number"
                      value={seats}
                      onChange={onSeatsChange}
                      className="input is-info"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="columns">
          <div className="column is-6">
            <div className="columns is-mobile">
              <div className="column">
                <div className="field">
                  <label htmlFor="password" className="label">
                    Password *
                  </label>
                  <div className="control">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={onPasswordChange}
                      className="input is-info"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="field">
                  <label htmlFor="confirm-password" className="label">
                    Confirm password*
                  </label>
                  <div className="control">
                    <input
                      ref={confirmPwdRef}
                      id="confirm-password"
                      type="password"
                      value={confirmPassword.value}
                      onChange={onConfirmPasswordChange}
                      className={`input ${
                        confirmPassword.isCorrect && confirmPassword.value != ""
                          ? "is-danger"
                          : "is-info"
                      }`}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          Use 8 or more characters with a mix of letters, numbers and symbols
        </p>
      </div>

      <div className="block">
        <div className="columns">
          <div className="column is-6">
            <div className="is-flex is-justify-content-space-between">
              <div className="columns">
                <div className="column">
                  <button
                    onClick={navigateToSignIn}
                    className="button is-ghost has-text-weight-bold"
                  >
                    Sign in instead
                  </button>
                </div>
                <div className="column">
                  <button
                    onClick={abortRegistration}
                    className="button is-ghost has-text-weight-bold"
                  >
                    Abort
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`button is-info ${isMutating && "is-loading"}`}
                value="Sign Up"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
