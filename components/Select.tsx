'use client';

import { useState } from 'react';

const Select = ({ label, options }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <label className="w-full border border-gray-200 p-3 rounded-lg relative">
      <span className="absolute -top-3 bg-white px-2">{label}</span>
      <select className="w-full bg-white px-3 outline-none">
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </label>
  );
};

type Props = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

export default Select;
