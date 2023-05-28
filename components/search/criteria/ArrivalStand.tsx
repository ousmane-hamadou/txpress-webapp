import Stand from "./Stand";
import LocationOn from "@/components/icons/LocationOn";

export default async function ArrivalStand({
  stand,
}: {
  stand: Promise<{ id: string; name: string }>;
}) {
  const { name } = await stand;
  return <Stand criteria="Arrival Stand" stand={name} icon={<LocationOn />} />;
}
