type Props = {
  children: React.ReactNode;
  profile: React.ReactNode;
  start_journey: React.ReactNode;
};
export default function DashboardLayout(props: Props) {
  return (
    <div className="columns">
      <div className="column is-8">{props.children}</div>
      <div className="column is-4">{props.start_journey}</div>
    </div>
  );
}
