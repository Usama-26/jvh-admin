import React, { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

export function RefreshButton({ onClick }) {
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    const newRotation = rotation + 360;
    setRotation(newRotation);
    onClick();
  };

  const iconStyles = {
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.8s ease-in-out",
  };

  return (
    <button onClick={handleClick} className="bg-[#D32A3D] p-1 rounded-full">
      <HiOutlineRefresh className="stroke-white w-6 h-6" style={iconStyles} />
    </button>
  );
}
