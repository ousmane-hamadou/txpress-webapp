import ArrivalStand from "@/components/stand/ArrivalStand";
import DepartureStand from "@/components/stand/DepartureStand";
import getStand from "@/libs/getStand";

type Props = {
  departureId: string;
  arrivalId: string;
};

export default async function JourneyCriteria(props: Props) {
  const [{ stand: departure }, { stand: arrival }] = await Promise.all([
    getStand(props.departureId),
    getStand(props.arrivalId),
  ]);

  return (
    <>
      <DepartureStand stand={departure} />

      <ArrivalStand stand={arrival} />
    </>
  );
}
