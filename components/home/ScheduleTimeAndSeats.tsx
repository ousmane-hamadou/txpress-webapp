import { DateTime } from "luxon";

type Props = {
  departureSchedule: DateTime;
  available_seats: number;
};

export default function ScheduleTimeAndSeats(props: Props) {
  return (
    <div className="notification is-primary is-light">
      <div className="content has-text-weight-bold is-medium has-text-centered">
        <p>
          <span>Départ à </span>
          {props.departureSchedule
            .setLocale("fr")
            .toLocaleString(DateTime.TIME_24_SIMPLE)}
        </p>
        <p className="">
          {props.available_seats} <span> places dispo</span>
        </p>
      </div>
    </div>
  );
}
