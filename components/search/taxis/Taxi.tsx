import { DateTime } from "luxon";

import AirlineSeatRecline from "@/components/icons/AirlineSeatRecline";
import Schedule from "@/components/icons/Schedule";

interface Taxi {
  number: string;
  brand: string;
  available_seats: number;
  departure_schedule: string;
}

export default function Taxi({
  taxi,
  actions,
}: {
  taxi: Taxi;
  actions: React.ReactNode;
}) {
  let d = DateTime.fromISO(taxi.departure_schedule);

  return (
    <div className="block box">
      <div className="columns">
        <div className="column">
          <div className="mb-2">
            <p className="is-size-5">{taxi.brand}</p>
            <p className="is-size-7">{taxi.number.toUpperCase()}</p>
          </div>

          <div className="columns">
            <div className="column is-narrow">
              <div className="columns is-6 is-gapless is-mobile">
                <div className="column is-narrow mr-2">
                  <AirlineSeatRecline />
                </div>
                <div className="column is-narrow">
                  <p className="is-size-6">
                    {taxi.available_seats} seats availables
                  </p>
                </div>
              </div>
            </div>

            <div className="column is-narrow">
              <div className="columns is-6 is-mobile is-gapless">
                <div className="column is-narrow mr-2">
                  <Schedule />
                </div>
                <div className="column is-narrow">
                  <p className="is-size-6">
                    departure in{" "}
                    {d.setLocale("fr").toLocaleString(DateTime.TIME_24_SIMPLE)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="columns">
            <div className="column">
              <p className="is-size-5">Choise your seats count</p>
            </div>
            <div className="column">{actions}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
