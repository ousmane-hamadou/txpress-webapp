import RegNumberForm from "./components/RegNumberForm";

export default function SignUpPage() {
  return (
    <div
      className="columns is-centered is-vcentered px-4"
      style={{ blockSize: "100vh" }}
    >
      <div className="column is-4">
        <div className="columns is-multiline">
          <div className="column is-full">
            <div className="content">
              <p className="title is-3 has-text-centered">Sign Up</p>
              <p className="subtitle is-6 has-text-centered">
                Let&apos;s begin the avdenture
              </p>
            </div>
          </div>

          <div className="column is-full">
            <RegNumberForm />
          </div>
        </div>
      </div>
    </div>
  );
}
