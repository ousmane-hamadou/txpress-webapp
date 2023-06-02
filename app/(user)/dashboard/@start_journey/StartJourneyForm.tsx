"use client";

import { DateTime } from "luxon";
import { createRef, useState } from "react";

import useSWRMutation from "swr/mutation";
import startJourney from "./startJourney";

type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;
type Props = {
  taxiRanks: { id: string; name: string }[];
  startJourneyApi: string;
};

export default function StartJourneyForm(props: Props) {
  const [departureId, setDepartureId] = useState(props.taxiRanks[0].id);
  const [arrivalId, setArrivalId] = useState(props.taxiRanks[1].id);

  const departureSchedule = createRef<HTMLInputElement>();

  const { isMutating, trigger, data } = useSWRMutation(
    props.startJourneyApi,
    startJourney
  );

  function handleDeparture(e: ChangeEvent) {
    setDepartureId(e.target.value);
  }

  function handleArrival(e: ChangeEvent) {
    setArrivalId(e.target.value);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dateTime = DateTime.fromISO(departureSchedule.current!.value).toISO();

    if (!dateTime) {
      departureSchedule.current?.focus();
      return;
    }

    await trigger({
      departureId,
      arrivalId,
      departureSchedule: dateTime,
    });
  }

  return (
    <>
      <div className="block">
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="departure" className="label">
              Departure
            </label>

            <div className="select is-fullwidth">
              <select
                required
                id="departure"
                value={departureId}
                onChange={handleDeparture}
              >
                {props.taxiRanks.map((taxi) => (
                  <option key={taxi.id} value={taxi.id}>
                    {taxi.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="arrival" className="label">
              Arrival
            </label>

            <div className="select is-fullwidth">
              <select
                required
                id="arrival"
                value={arrivalId}
                onChange={handleArrival}
              >
                {props.taxiRanks.map((taxi) => (
                  <option key={taxi.id} value={taxi.id}>
                    {taxi.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="departure-schedule" className="label">
              Departure Schedule
            </label>

            <div className="columns">
              <div className="column">
                <input
                  type="datetime-local"
                  className="input"
                  ref={departureSchedule}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`button is-primary is-fullwidth ${
              isMutating && "is-loading"
            }`}
          >
            Send
          </button>
        </form>
      </div>

      {data?.hasError && data.code == 500 && (
        <ErrorNotification color="is-danger" msg={data.errMsg} />
      )}
      {data?.hasError && data.code == 400 && (
        <ErrorNotification color="is-warning" msg={data.errMsg} />
      )}
    </>
  );
}

function ErrorNotification({
  msg,
  color,
}: {
  msg: string;
  color: "is-danger" | "is-warning";
}) {
  return (
    <div className={`notification is-warning is-small`}>
      <p className="is-5">{msg}</p>
    </div>
  );
}
