import TripOrigin from "@/components/icons/TripOrigin";
import Stand from "./Stand";

export default async function DepartureStand({
  stand,
}: {
  stand: Promise<{ id: string; name: string }>;
}) {
  const { name } = await stand;
  return (
    <Stand criteria="Departure Stand" icon={<TripOrigin />} stand={name} />
  );
}
