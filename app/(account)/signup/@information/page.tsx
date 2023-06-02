import { cookies } from "next/headers";

import Logo from "@/components/Logo";
import InformationForm from "../components/InformationForm";

export default function InformationPage() {
  const next = cookies().get("next")!.value;
  return (
    <>
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <Logo />
            </div>
          </div>
        </div>
      </nav>

      <div className="container pt-4 px-4">
        <div className="block">
          <div className="content">
            <p className="title is-3 has-text-info">
              Complete your TXpress Account
            </p>
          </div>
        </div>

        <div className="block">
          <InformationForm next={next} />
        </div>
      </div>
    </>
  );
}
