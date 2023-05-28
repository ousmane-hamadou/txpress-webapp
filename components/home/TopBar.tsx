import Link from "next/link";

export default function TopBar({ logo }: { logo: React.ReactNode }) {
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">{logo}</div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link
                  href="/sign-in"
                  className="button is-link is-small is-light"
                >
                  Sign In
                </Link>

                <Link
                  className="button is-small is-outlined is-dark"
                  href="/sign-up"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
