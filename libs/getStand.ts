type Response = { stand: { id: string; name: string } };

export default async function getStand(url: string) {
  const resp = await fetch(url);

  return (await resp.json()) as Response;
}
