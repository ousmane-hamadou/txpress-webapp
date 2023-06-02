"use client";

import useSWRMutation from "swr/mutation";
import { Suspense } from "react";
import InProgressJourneyDetails from "./InProgressJourneyDetails";
import useInProgressJourneyDetails from "./useInProgressJourneyDetails";
import JourneyCriteria from "./JourneyCriteria";
import Journey from "./Journey";
import { Journey as J } from "@/libs/types";
import performAction from "./performAction";

type Props = {
  journey: J | null;
  journeyUrl: string;
};

export default function InProgressJourney(props: Props) {
  const { data } = useInProgressJourneyDetails(props.journeyUrl);
  const {
    isMutating: isCancelMutation,
    data: cancelData,
    trigger: triggerCancel,
  } = useSWRMutation(
    data && data.code == 200
      ? data.payload?._links?.cancel?.href
      : props.journey
      ? props.journey?._links?.cancel?.href
      : "",
    performAction
  );
  const {
    isMutating: isCloseMutation,
    data: closeDate,
    trigger: triggerClose,
  } = useSWRMutation(
    data && data.code == 200
      ? data.payload?._links?.close?.href
      : props.journey
      ? props.journey?._links?.close?.href
      : "",
    performAction
  );

  if (!data || !props.journey) {
    return null;
  }

  if (data && data.hasError) {
    return null;
  }

  const actions = [
    (data && data.code == 200 && data.payload!._links?.cancel) ||
    (props.journey && props.journey._links?.cancel) ? (
      <button
        onClick={async () => await triggerCancel({ method: "delete" })}
        key="1"
        className="is-small is-fullwidth is-danger button has-text-weight-bold"
      >
        Cancel
      </button>
    ) : (
      <></>
    ),
    (data && data.code == 200 && data.payload!._links?.close) ||
    (props.journey && props.journey._links?.close) ? (
      <button
        key="2"
        onClick={async () => await triggerClose({ method: "patch" })}
        className="is-small is-fullwidth is-warning button has-text-weight-bold"
      >
        Close
      </button>
    ) : (
      <></>
    ),
  ] as [React.ReactNode?, React.ReactNode?];

  return (
    <Journey
      actions={actions}
      details={
        data && !data.hasError ? (
          <InProgressJourneyDetails
            departureSchedule={data.payload!.departure_schedule}
            journeyUrl={props.journeyUrl}
            reservedSeats={data.payload!.reserved_seats}
          />
        ) : props.journey ? (
          <InProgressJourneyDetails
            departureSchedule={props.journey.departure_schedule}
            journeyUrl={props.journeyUrl}
            reservedSeats={props.journey.reserved_seats}
          />
        ) : null
      }
      taxi_ranks={
        data && !data.hasError ? (
          <Suspense>
            {/**@ts-expect-error */}
            <JourneyCriteria
              arrivalId={data.payload!.arrival_id}
              departureId={data.payload!.departure_id}
            />
          </Suspense>
        ) : props.journey ? (
          <Suspense>
            {/**@ts-expect-error */}
            <JourneyCriteria
              arrivalId={props.journey.arrival_id}
              departureId={props.journey.departure_id}
            />
          </Suspense>
        ) : null
      }
    />
  );
}
