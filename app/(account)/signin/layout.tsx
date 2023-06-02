import Logo from "@/components/Logo";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <main>{children}</main>
    </>
  );
}
