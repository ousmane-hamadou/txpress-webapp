import getTaxiRanks from "@/libs/getTaxiRanks";
import StartJourneyForm from "./StartJourneyForm";
import getTaxiOwner from "@/libs/getTaxiOwner";
import { redirect } from "next/navigation";

export default async function StartJourneyPage() {
  const r1 = getTaxiRanks();
  const r2 = getTaxiOwner();

  const [{ taxi_ranks }, owner] = await Promise.all([r1, r2]);

  if (!owner) {
    redirect("/signin");
  }

  return (
    <section className="section">
      <div className="block">
        <div className="content">
          <p className="title is-4">Start Journey</p>
        </div>
      </div>

      <div className="block">
        <div className="column">
          <StartJourneyForm
            startJourneyApi={owner._links["start-journey"].href}
            taxiRanks={taxi_ranks}
          />
        </div>
      </div>
    </section>
  );
}
