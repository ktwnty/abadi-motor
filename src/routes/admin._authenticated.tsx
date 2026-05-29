import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { AdminSidebar, AdminMobileBar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin/_authenticated")({
  component: AdminAuthenticatedLayout,
});

function AdminAuthenticatedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/admin/login", replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Memuat sesi...
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Atmospheric glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.72_0.19_240/0.15),transparent_70%)]" />
      <div className="pointer-events-none fixed bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />

      <AdminSidebar />
      <AdminMobileBar />

      <main className="px-4 pb-28 pt-6 lg:ml-[17.5rem] lg:pb-10 lg:pr-6 lg:pt-6">
        <Outlet />
      </main>
    </div>
  );
}
