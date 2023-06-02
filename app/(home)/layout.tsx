import Logo from "@/components/Logo";
import TopBar from "@/components/home/TopBar";
import TopBarActions from "@/components/home/TopBarActions";

type Props = {
  children: React.ReactNode;
};

export default async function HomeLayout(props: Props) {

  return (
    <>
      <TopBar actions={<TopBarActions />} logo={<Logo />} />
      {props.children}
    </>
  );
}
