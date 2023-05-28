export default function SearchLayout({
  children,
  criteria,
}: {
  children: React.ReactNode;
  criteria: React.ReactNode;
}) {
  return (
    <div className="has-background-white-bis">
      <main className="container">
        <div className="columns">
          <div className="column is-narrow is-hidden-mobile">{criteria}</div>

          <div className="column">{children}</div>
        </div>
      </main>
    </div>
  );
}
