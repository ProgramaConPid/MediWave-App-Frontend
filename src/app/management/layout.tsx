import AuthGuard from "@/components/auth/AuthGuard";
import React from "react";

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
