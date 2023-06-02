import TripOrigin from "@/components/icons/TripOrigin";
import Stand from "./Stand";

export default function DepartureStand({
  stand,
}: {
  stand: { id: string; name: string };
}) {
  const { name } = stand;
  return (
    <Stand criteria="Departure Stand" icon={<TripOrigin />} stand={name} />
  );
}
