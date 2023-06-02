export default function Stand({
  criteria,
  stand,
  icon,
}: {
  criteria: string;
  stand: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="columns is-vcentered is-mobile">
      <div className="column is-narrow">{icon}</div>

      <div className="column is-narrow">
        <p className="is-size-6">{criteria}</p>
        <p className="is-size-6">
          <strong>{stand}</strong>
        </p>
      </div>
    </div>
  );
}
