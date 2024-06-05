"use client";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
  const { onOpen } = useNewAccount();

  return (
    <div className="py-3">
      <Button onClick={onOpen}>Add New Account</Button>
    </div>
  );
}
