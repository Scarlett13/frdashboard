import React, { useState } from "react";

type CheckBoxProps = {
  checkboxName: string;
};

export default function CheckBox({ checkboxName }: CheckBoxProps) {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <label className="space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="checkbox w-4 h-4 mx-4 cursor-pointer"
        checked={checked}
        onChange={toggleChecked}
      />
      {checkboxName}
    </label>
  );
}
