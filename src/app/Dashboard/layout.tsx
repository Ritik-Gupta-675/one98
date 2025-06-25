import Sidebar from "@/components/dashboard/sidebar";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-background">
      <Sidebar />
      <div className="md:pl-[280px]">
        <main className="container mx-auto px-4 py-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;