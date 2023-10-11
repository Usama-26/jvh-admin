import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

export default function AppLayout({ children }) {
  return (
    <div>
      <SideNav />
      <div className="main-margin bg-[#171717] min-h-screen">
        <Header />
        {children}
      </div>
    </div>
  );
}
