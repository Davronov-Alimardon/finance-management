import { UserButton } from "@clerk/nextjs";

export default function DefaultPage() {
  return <UserButton afterSignOutUrl="/" />;
}
