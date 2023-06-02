async function getTaxis(url: string) {
  const res = fetch(url, {
    headers: new Headers({ Accept: "application/json" }),
  });
}

export default function Taxis() {
  return (
    <section className="section has-background-white-ter">
      <div className="container">
        <div className="content">
          <p className="title is-4">All Taxis</p>
        </div>
      </div>
    </section>
  );
}
