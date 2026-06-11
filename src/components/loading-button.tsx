"use client";

import { Button } from "@/components/ui/button";

export function LoadingButton({
  loading,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { loading?: boolean }) {
  return (
    <Button disabled={loading || props.disabled} {...props}>
      {loading ? "Working..." : children}
    </Button>
  );
}