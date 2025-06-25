"use client";
import  { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  BarChart,
  Settings,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Articles",
    href: "/dashboard/articles/create",
    icon: FileText,
  },
  {
    name: "Edit Articles",
    href: "/dashboard/articles/edit",
    icon: FileText,
  },
  {
    name: "Comments",
    href: "/dashboard/comments",
    icon: MessageCircle,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          className="h-10 w-10 rounded-full bg-[#232946]/80 backdrop-blur-sm border border-[#232946] shadow-sm flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5 text-white" />
          <span className="sr-only">Toggle menu</span>
        </button>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <div className="relative w-[280px] h-full bg-gradient-to-b from-[#232946] via-[#1a1a2e] to-[#12122b] border-r border-[#232946] flex flex-col">
              <div className="flex items-center justify-between h-16 px-6 border-b border-[#232946]">
                <span className="text-xl font-bold tracking-tight text-white select-none">
                  Admin Dashboard
                </span>
                <button
                  className="ml-auto text-gray-400 hover:text-white focus:outline-none"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close sidebar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <DashboardSidebar closeSheet={() => setIsOpen(false)} />
            </div>
          </div>
        )}
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-[280px] flex-col fixed border-r border-[#232946] bg-gradient-to-b from-[#232946] via-[#1a1a2e] to-[#12122b]">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default Sidebar;

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  const pathname = usePathname();

  const renderNav = () => (
    <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname?.startsWith(item.href));
        const Icon = item.icon;
        return (
          <a
            key={item.href}
            href={item.href}
            className={`group flex items-center w-full px-4 py-2.5 rounded-lg transition-all duration-150 text-base font-medium
              ${
                isActive
                  ? "bg-white/10 text-white border-l-4 border-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }
            `}
            onClick={() => closeSheet?.()}
          >
            <Icon
              className={`w-5 h-5 mr-3 ${
                isActive
                  ? "text-white"
                  : "text-gray-400 group-hover:text-white"
              }`}
            />
            <span className="truncate">{item.name}</span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-[#232946]">
        <span className="text-xl font-bold tracking-tight text-white select-none">
          Admin Dashboard
        </span>
      </div>

      {renderNav()}
    </div>
  );
}