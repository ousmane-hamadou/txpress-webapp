import Link from "next/link";

export default function Logo({ color }: { color?: string }) {
  return (
    <Link className={`title is-3 ${color && color}`} href="/">
      TXpress
    </Link>
  );
}
