import { DateTime } from "luxon";

import LocationOn from "../icons/LocationOn";
import TripOrigin from "../icons/TripOrigin";

export default function Taxi() {
  const d = DateTime.utc();
  return (
    <article
      className="block columns is-multiline has-background-white"
      style={{ borderRadius: "4px" }}
    >
      <div className="column is-narrow">
        <div className="notification is-primary is-light">
          <div className="content has-text-weight-bold is-medium has-text-centered">
            <p>
              Depart a{" "}
              {d.setLocale("fr").toLocaleString(DateTime.TIME_24_SIMPLE)}
            </p>
            <p className="">2 places dispo</p>
          </div>
        </div>
      </div>

      <div className="column is-narrow">
        <div className="content">
          <p className="has-text-info title is-4">Coralla S</p>

          <div className="columns is-mobile">
            <div className="column is-narrow  ">
              <TripOrigin />
            </div>
            <div className="column">
              <p className="has-text-weight-bold">Gerite (Bini)</p>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-narrow  ">
              <LocationOn />
            </div>
            <div className="column">
              <p className="has-text-weight-bold">Grande Marche (Ville)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="is-flex is-justify-content-flex-end is-align-items-bottom">
          <button className="button is-link is-medium">Reserver</button>
        </div>
      </div>
    </article>
  );
}
