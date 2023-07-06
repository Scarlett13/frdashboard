import { useState } from "react";

export default function Toggle() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <button
        className={`px-4 py-2 text-white rounded ${
          isToggled ? "bg-green-600" : "bg-red-600"
        }`}
        onClick={handleToggle}
      >
        {isToggled ? "Active" : "Deactive"}
      </button>
    </div>
  );
}
