import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";

const Dashboard = () => {
  const cardsData = [
    {
      title: "Estudiantes",
      count: 3,
      description: "Total students",
      gradient: "bg-gradient-to-r from-[#FF4D6D] to-[#FF6B8D]",
    },
    {
      title: "Profesores",
      count: 3,
      description: "Total teachers",
      gradient: "bg-gradient-to-r from-[#4D9EFF] to-[#6BBFFF]",
    },
    {
      title: "Padres",
      count: 2,
      description: "Total parents",
      gradient: "bg-gradient-to-r from-[#4DFF88] to-[#6BFFAA]",
    },
    {
      title: "Bibliotecario",
      count: 2,
      description: "Total librarians",
      gradient: "bg-gradient-to-r from-[#FFAC4D] to-[#FFC26B]",
    },
    {
      title: "Asistencia",
      count: 0,
      description: "Total present students today",
      gradient: "bg-gradient-to-r from-[#9B4DFF] to-[#B96BFF]",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              count={card.count}
              description={card.description}
              gradient={card.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
