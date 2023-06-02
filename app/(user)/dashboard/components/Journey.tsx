import { DateTime } from "luxon";

type Props = {
  taxi_ranks: React.ReactNode;
  details: React.ReactNode;
  readonly actions: [React.ReactNode?, React.ReactNode?];
};

export default function Journey(props: Props) {
  return (
    <article className="p-4">
      <div className="tile is-ancestor">
        <div
          className="tile is-parent is-vertical has-background-white"
          style={{ borderStartStartRadius: "8px", borderEndStartRadius: "8px" }}
        >
          <div className="tile is-child">{props.taxi_ranks}</div>
        </div>

        <div
          className="tile is-parent is-vertical has-background-white"
          style={{ borderEndEndRadius: "8px", borderStartEndRadius: "8px" }}
        >
          <div className="tile is-child">{props.details}</div>

          <div className="tile">
            <div className="tile is-parent">
              {props.actions[0] && (
                <div className="tile is-child">{props.actions[0]}</div>
              )}

              {props.actions[1] && (
                <div className="tile is-child">{props.actions[1]}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
