import React from "react";

const DashboardCard = ({ title, count, description, gradient }) => {
  return (
    <div className={`${gradient} text-white p-6 rounded-lg shadow-lg`}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl font-extrabold mb-1">{count}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default DashboardCard;
