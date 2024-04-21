"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/products";
import { Trash2, XCircle, CheckCircle2, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownIten({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        !isPending &&
          startTransition(async () => {
            await toggleProductAvailability(id, !isAvailableForPurchase);
            router.refresh();
          });
      }}
    >
      {isAvailableForPurchase ? (
        <>
          <XCircle />
          <span className="pl-2">Deactivate</span>
        </>
      ) : (
        <>
          <CheckCircle2 />
          <span className="pl-2">Activate</span>
        </>
      )}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownIten({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="text-red-600 hover:bg-red-600 hover:text-white"
      disabled={disabled || isPending}
      onClick={() => {
        !(disabled || isPending) &&
          startTransition(async () => {
            await deleteProduct(id);
            router.refresh();
          });
      }}
    >
      <>
        <Trash2 />
        <span className="pl-2">Delete</span>
      </>
    </DropdownMenuItem>
  );
}
