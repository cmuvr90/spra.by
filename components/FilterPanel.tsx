'use client';

import { useEffect, useMemo, useState } from 'react';
import Filter from './Filter';
import { FilterCommonValueType } from '@/core/types/Filter';
import { Category as CategoryType } from '@/core/types/Category';
import { Category } from '@/core/services/Category';

const FilterPanel = ({ categories: categoriesData = [], onChange }: Props) => {
  const categories = useMemo(() => categoriesData.map(i => new Category(i)), [categoriesData]);
  const [value, setValue] = useState<FilterCommonValueType[]>([]);
  const filters = useMemo(() => Category.getFiltersGroups(categories), [categories]);

  useEffect(() => {
    onChange(value, categories.map(i => i.getId()));
  }, [value]);

  /**
   *
   * @param filterValue
   */
  const _onChange = (filterValue: FilterCommonValueType) => {
    setValue(value => {
      if (filterValue.values.length === 0 && filterValue.ids.length === 0) {
        value = value.filter(i => i.key !== filterValue.key);
      } else {
        let currentValue = value.find(i => i.key === filterValue.key);
        if (currentValue) {
          currentValue.ids = filterValue.ids;
          currentValue.values = filterValue.values;
        } else {
          value.push(filterValue);
        }
      }
      return [...value];
    });
  };

  return (
    <div className={'flex flex-col gap-5'}>
      {filters.map((filter, index) => (
        <Filter key={index} filter={filter} onChange={_onChange} />
      ))}
    </div>
  );
};

export default FilterPanel;

type Props = {
  categories: CategoryType[];
  onChange: (value: FilterCommonValueType[], categoryIds: string[]) => void;
};
