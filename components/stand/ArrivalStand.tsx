import Stand from "./Stand";
import LocationOn from "@/components/icons/LocationOn";

export default function ArrivalStand({
  stand,
}: {
  stand: { id: string; name: string };
}) {
  const { name } = stand;
  return <Stand criteria="Arrival Stand" stand={name} icon={<LocationOn />} />;
}
