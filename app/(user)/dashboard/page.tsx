import getTaxiOwner from "@/libs/getTaxiOwner";
import Journey from "./components/Journey";
import { redirect } from "next/navigation";
import getTrips from "@/libs/getTrips";
import JourneyDetails from "./components/JourneyDetails";
import { DateTime } from "luxon";
import JourneyCriteria from "./components/JourneyCriteria";
import { Suspense } from "react";
import getJourney from "@/libs/getJourney";
import InProgressJourneyDetails from "./components/InProgressJourneyDetails";
import InProgressJourney from "./components/InProgressJourney";

export default async function DashboardPage() {
  const owner = await getTaxiOwner();

  if (!owner) redirect("/signin");

  let r1 = [
    getTrips(owner._links.trips.href),
    owner._links.journey_in_progress
      ? getJourney(owner._links.journey_in_progress.href)
      : Promise.resolve(null),
  ] as const;

  const [{ trips }, journey] = await Promise.all(r1);

  return (
    <main className="has-background-white-ter">
      <section className="section">
        <div className="content">
          <p className="title is-2">Dashboard</p>
        </div>
      </section>

      <section className="section">
        <div className="block">
          <div className="content">
            <p className="title is-4">All Journey</p>
          </div>
        </div>

        <div className="block">
          <InProgressJourney
            journey={journey}
            journeyUrl={owner._links.journey_in_progress!.href}
          />
        </div>

        {trips.length == 0 ? (
          !journey ? (
            Notification()
          ) : (
            <></>
          )
        ) : (
          trips.map((trip) => {
            if (trip._links.cancel) {
              return;
            }

            return (
              <div className="block" key={trip.id}>
                <Journey
                  taxi_ranks={
                    <Suspense>
                      {/**@ts-expect-error */}
                      <JourneyCriteria
                        arrivalId={trip.arrival_id}
                        departureId={trip.departure_id}
                      />
                    </Suspense>
                  }
                  actions={[<></>, <></>]}
                  details={
                    <JourneyDetails
                      departureSchedule={DateTime.fromISO(
                        trip.departure_schedule,
                        { setZone: true }
                      )}
                      reservedSeats={trip.reserved_seats}
                    />
                  }
                />
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}

function Notification() {
  return (
    <div className="block">
      <div className="notification is-info">Your no journey!</div>
    </div>
  );
}
