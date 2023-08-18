'use client';

import { Category } from '@/core/types/CategoryInterface';
import { Option } from '@/core/types/OptionInterface';
import { transliterate as tr } from 'transliteration';
import { useMemo } from 'react';
import Filter from './Filter';

const FilterPanel = ({ categories = [], onChange }: Props) => {
  const filters = useMemo(() => getFiltersGroups(categories), [categories]);

  const _onChange = () => {
    onChange(5);
  };

  return (
    <div>
      {filters.map((filter, index) => (
        <Filter key={index} filter={filter} onChange={_onChange} />
      ))}
    </div>
  );
};

type Props = {
  categories: Category[];
  onChange: (value: any) => void;
};

export default FilterPanel;

/**
 *
 * @param categories
 */
function getFiltersGroups(categories: Category[]): Filter[] {
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
    .reduce((acc: Filter[], optionValue: { key: string; title: string; value: string; ids: string[] }) => {
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

type Filter = {
  key: string;
  title: string;
  values: { value: string; ids: string[] }[];
};
