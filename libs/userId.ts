import { cookies } from "next/headers";

export default function userId() {
  const store = cookies();
  const self = store.get("self")?.value;

  if (!self) return [null, null, null] as const;
  const arr = self.split("/");
  const id = arr[arr.length - 2];

  const c = store.get(id)?.value;

  return [id, c, self as string] as const;
}
