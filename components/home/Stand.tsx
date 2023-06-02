type Props = {
  icon: React.ReactNode;
  stand: string;
};

export default function Stand(props: Props) {
  return (
    <div className="columns is-mobile">
      <div className="column is-narrow  ">{props.icon}</div>
      <div className="column">
        <p className="has-text-weight-bold">{props.stand}</p>
      </div>
    </div>
  );
}
