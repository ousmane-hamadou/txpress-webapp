import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
  information: React.ReactNode;
};

export default function SignUpLayout(props: Props) {
  const next = cookies().get("next")?.value;
  return <div className="">{next ? props.information : props.children}</div>;
}
