'use client';

import { transliterate as tr } from 'transliteration';
import { useEffect, useMemo, useState } from 'react';
import Filter from './Filter';
import { FilterCommonValueType, FilterType } from '@/core/types/Filter';
import { Category } from '@/core/types/Category';
import { Option } from '@/core/types/Option';

const FilterPanel = ({ categories = [], onChange }: Props) => {
  const [value, setValue] = useState<FilterCommonValueType[]>([]);
  const filters = useMemo(() => getFiltersGroups(categories), [categories]);

  useEffect(() => {
    onChange(value, categories.map(i => i.id));
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
  categories: Category[];
  onChange: (value: FilterCommonValueType[], categoryIds: string[]) => void;
};

/**
 *
 * @param categories
 */
function getFiltersGroups(categories: Category[]): FilterType[] {
  return categories

    .reduce((acc: Option[], category: Category) => {
      category.options.map((option) => {
        if (!acc.find((i) => i.id === option.id)) acc.push(option);
      });
      return acc;
    }, [])

    .reduce((acc: { key: string; title: string; value: string; ids: string[] }[], option: Option) => {
      const key = tr(option.title).toLowerCase().replaceAll(' ', '_');

      option.values.map((value) => {
        const currentValue = acc.find((i) => i.value === value && i.key === key);
        if (currentValue) {
          currentValue.ids = Array.from(new Set([...currentValue.ids, option.id]));
        } else {
          acc.push({ key, title: option.title, value, ids: [option.id] });
        }
      });

      return acc;
    }, [])

    .reduce((acc: FilterType[], optionValue: { key: string; title: string; value: string; ids: string[] }) => {
      const currentOptionValue = acc.find((i) => i.key === optionValue.key);
      if (currentOptionValue) {
        currentOptionValue.values = [...currentOptionValue.values, { value: optionValue.value, ids: optionValue.ids }];
      } else {
        acc.push({
          key: optionValue.key,
          title: optionValue.title,
          values: [{ value: optionValue.value, ids: optionValue.ids }],
        });
      }
      return acc;
    }, [])

    .map((type) => ({
      ...type,
      values: type.values.sort((a, b) => {
        return a.value.toUpperCase() < b.value.toUpperCase() ? -1 : a.value.toUpperCase() > b.value.toUpperCase() ? 1 : 0;
      }),
    }));
}
