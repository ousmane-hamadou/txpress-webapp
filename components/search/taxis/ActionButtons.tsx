import ActionButton from "./ActionButton";
export default function ActionButtons({
  seats,
}: {
  seats: { [key: string]: { href: string } };
}) {
  return (
    <div className="buttons">
      {Object.entries(seats).map(([k, { href }]) => (
        <ActionButton key={k} seat_count={k} select_url={href} />
      ))}
    </div>
  );
}
