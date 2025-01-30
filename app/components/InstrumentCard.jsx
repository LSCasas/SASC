import React from "react";

const InstrumentCard = ({ title, instructor, gradient }) => {
  return (
    <div
      className={`${gradient} text-white p-6 rounded-lg shadow-md transform transition-transform duration-200 ease-in-out hover:scale-105`}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-md mb-1">Instructor: {instructor}</p>
    </div>
  );
};

export default InstrumentCard;
