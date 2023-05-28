import "bulma/css/bulma.min.css";

import Logo from "@/components/Logo";
import TopBar from "@/components/home/TopBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <TopBar logo={<Logo />} />
        {children}
      </body>
    </html>
  );
}
