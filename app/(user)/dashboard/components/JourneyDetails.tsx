import { DateTime } from "luxon";

type Props = {
  reservedSeats: number;
  departureSchedule: DateTime;
};

export default function JourneyDetails(props: Props) {
  return (
    <div className="content">
      <p className="subtitle is-5 has-text-centered">Reserved seats</p>
      <p className="title has-text-centered is-3">{props.reservedSeats}</p>
      <p className="subtitle is-5 has-text-centered">
        <span> Départ à </span>
        {props.departureSchedule
          .setLocale("fr")
          .toLocaleString(DateTime.TIME_24_SIMPLE)}
      </p>
    </div>
  );
}
