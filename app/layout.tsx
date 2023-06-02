import { preFetchTaxiRanks } from "@/libs/getTaxiRanks";
import { preFetchTaxiOwner } from "@/libs/getTaxiOwner";
import "bulma/css/bulma.min.css";

preFetchTaxiRanks();

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
