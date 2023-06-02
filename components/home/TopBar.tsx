interface Props {
  actions: React.ReactNode;
  logo: React.ReactNode;
}

export default function TopBar(props: Props) {
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">{props.logo}</div>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">{props.actions}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
