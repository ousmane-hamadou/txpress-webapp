interface Arg {
  departureId: string;
  arrivalId: string;
}

interface Options {
  arg: Arg;
}

async function performSearch(url: string, opts: Options) {
  const { arg } = opts;
  const data = { arrival_id: arg.arrivalId, departure_id: arg.departureId };
  const request = {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  };

  return await fetch(url, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "include",
    body: JSON.stringify({
      arrival_id: arg.arrivalId,
      departure_id: arg.departureId,
    }),
  }).then((res) => res.json() as Promise<{ id: string }>);
}
