import SearchForm from "@/components/home/SearchForm";
import getTaxiOwner from "@/libs/getTaxiOwner";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export default async function Home() {
  const taxiOwner = await getTaxiOwner();
  if (taxiOwner) redirect("/dashboard", RedirectType.replace);
  return (
    <main>
      <section
        className="hero is-small"
        style={{ background: "linear-gradient(to right, #36d1dc, #5b86e5)" }}
      >
        <div className="hero-body">
          <div className="columns is-multiline">
            <div className="column is-12">
              <div className="block">
                <p className="title is-text-white has-text-centered has-text-white">
                  Reservez votre taxis en ligne
                </p>
              </div>
            </div>

            <div className="column is-8 is-offset-2">
              <SearchForm
                taxiRanks={[{ id: "7883", name: "Grand Marche (Ville)" }]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
