"use client";

import { DateTime } from "luxon";
import useInProgressJourneyDetails from "./useInProgressJourneyDetails";
import JourneyDetails from "./JourneyDetails";

type Props = {
  reservedSeats: number;
  departureSchedule: string;
  journeyUrl: string;
};

export default function InProgressJourneyDetails(props: Props) {
  const { data } = useInProgressJourneyDetails(props.journeyUrl);
  if (data && data.hasError) {
    return <div className="notification">{data.errMsg}</div>;
  }
  return (
    <JourneyDetails
      departureSchedule={DateTime.fromISO(
        data ? data.payload!.departure_schedule : props.departureSchedule
      )}
      reservedSeats={data ? data.payload!.reserved_seats : props.reservedSeats}
    />
  );
}
