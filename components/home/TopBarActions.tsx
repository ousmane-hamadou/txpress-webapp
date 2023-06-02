import Link from "next/link";

export default function TopBarActions() {
  return (
    <div className="buttons">
      <Link href="/signin" className="button is-info">
        Sign In
      </Link>

      <Link className="button is-outlined" href="/signup">
        Sign Up
      </Link>
    </div>
  );
}
