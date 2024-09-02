import { Outlet } from "@remix-run/react";

export function NestedOutletLayout() {
  return (
    <div className="py-5">
      <Outlet />
    </div>
  );
}
