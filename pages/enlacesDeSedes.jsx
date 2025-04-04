import SidebarAdmin from "@/components/SidebarAdmin";
import CampusCard from "@/components/CampusCard";
import useCurrentUserSession from "@/hooks/useCurrentUserSession";
export default function Admin() {
  useCurrentUserSession();
  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarAdmin />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
            Sedes culturales
          </h1>
          <CampusCard />
        </div>
      </div>
    </div>
  );
}
