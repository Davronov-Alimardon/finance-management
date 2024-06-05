"use client";

import { Plus } from "lucide-react";
import { columns, Payment } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "748ed52f",
    amount: 400,
    status: "success",
    email: "m22@example.com",
  },
];

export default function Accounts() {
  const newAccount = useNewAccount();

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new account
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="status"
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
