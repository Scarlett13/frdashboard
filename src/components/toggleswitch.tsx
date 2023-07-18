import { useState } from "react";

type ToggleProps = {
  props1: string;
  props2: string;
};

export default function Toggle({ props1, props2 }: ToggleProps) {
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
        {isToggled ? props1 : props2}
      </button>
    </div>
  );
}
