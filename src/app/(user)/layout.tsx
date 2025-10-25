import "@/styles/globals.css";
import Navbar from "@/shared/components/Navbar";
import Topbar from "@/shared/components/TopBar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-50 text-neutral-900 overflow-hidden">
      <div className="fixed flex top-1/4 opacity-35 blur-3xl">
        <div className="w-96 h-96 bg-orange-1 rounded-full left-0"></div>
        <div className="w-96 h-96 bg-purple-1 rounded-full right-0"></div>
      </div>
      <div></div>
      <div className="w-[480px] flex-1 bg-[#FAF9FA] shadow-sm overflow-hidden pb-14">
        <Topbar />
        <div className="px-4 pt-2">{children}</div>
      </div>
      <Navbar />
    </div>
  );
}
