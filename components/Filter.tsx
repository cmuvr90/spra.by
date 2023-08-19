'use client';

import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import { FilterCommonValueType, FilterType, FilterValueType } from '@/core/types/Filter';

const Filter = ({ filter, onChange }: Props) => {
  const [selected, setSelected] = useState<FilterValueType[]>([]);

  useEffect(() => {
    const ids = new Map();
    const values = new Map();

    selected.map(i => {
      i.ids.map(id => { if (!ids.has(id)) ids.set(id, id); });
      if (!values.has(i.value)) values.set(i.value, i.value);
    });

    onChange({
      key: filter.key,
      ids: Array.from(ids.values()),
      values: Array.from(values.values()),
    });
  }, [selected]);

  const _onChange = (checked: boolean, filterValue: FilterValueType) => {
    setSelected((values: FilterValueType[]) => {
      if (checked) {
        if (!values.find(i => i.value === filterValue.value)) values.push(filterValue);
      } else {
        values = values.filter(i => i.value !== filterValue.value);
      }
      return [...values];
    });
  };

  return (
    filter && (
      <div className='flex gap-3 flex-col'>
        <h3 className='text-gray-800 font-bold text-sm'>{filter.title}</h3>
        <ul className='flex flex-col gap-2'>
          {
            filter.values.map((i, index) => {
              return (
                <li key={index}>
                  <Checkbox
                    label={i.value}
                    onChange={(v: boolean) => _onChange(v, i)}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
    )
  );
};

type Props = {
  filter: FilterType
  onChange: (value: FilterCommonValueType) => void;
};

export default Filter;
