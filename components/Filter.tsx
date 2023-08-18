'use client';

import { useState } from 'react';
import Checkbox from './Checkbox';

const Filter = ({ filter, onChange }: Props) => {
  console.log('filter =', filter);

  const [value, setValue] = useState(null);

  const _onChange = (checked: boolean, filterValue: { value: string; ids: string[] }) => {};

  return (
    filter && (
      <div className="flex gap-5 flex-col">
        <h3 className="text-gray-800 font-bold text-sm">{filter.title}</h3>
        <ul className="flex flex-col gap-2">
          {filter.values.map((i, index) => {
            return (
              <li key={index}>
                <Checkbox label={i.value} onChange={(v: boolean) => _onChange(v, i)} />
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

type Props = {
  onChange: (checked: boolean, value: { value: string; ids: string[] }) => void;
  filter: {
    key: string;
    title: string;
    values: { value: string; ids: string[] }[];
  };
};

export default Filter;
