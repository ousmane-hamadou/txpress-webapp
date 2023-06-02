import Link from "next/link";
import SignInForm from "./components/SignInForm";

export default function SignInPage() {
  return (
    <div className="columns mt-3 mx-4 is-centered">
      <div
        className="column is-4 py-6 has-background-white-ter"
        style={{ borderRadius: "8px" }}
      >
        <div className="block">
          <div className="content">
            <p className="title is-3 has-text-weight-medium has-text-centered">
              Sign in to TXpress
            </p>
          </div>
        </div>

        <div className="block px-4 py-5">
          <SignInForm />
        </div>
        <div
          className="block py-1"
          style={{
            border: "1px solid #0000002f",
            borderRadius: "8px",
            display: "grid",
            placeContent: "center",
          }}
        >
          <div className="is-flex is-flex-direction-row is-align-items-center">
            <p>New to TXpress?</p>
            <Link className="button is-ghost" href="/signup">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
