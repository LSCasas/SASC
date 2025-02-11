import Sidebar from "@/components/Sidebar";
import SedesCard from "@/components/SedesCard";

export default function Admin() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
            Sedes culturales
          </h1>
          <SedesCard />
        </div>
      </div>
    </div>
  );
}
