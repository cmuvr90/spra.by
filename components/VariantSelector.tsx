'use client';

import Select from '@/components/Select';
import { Product as ProductType } from '@/core/types/Product';
import { Product } from '@/core/services/Product';
import { useEffect, useMemo, useState } from 'react';
import { Variant } from '@/core/types/Variant';

const VariantSelector = ({ product: productData, onChange }: Props) => {
  const product = useMemo(() => new Product(productData), [productData]);
  const [variant, setVariant] = useState(product.getDefaultVariant());
  const [combination, setCombination] = useState(variant ? variant.combinations : {});

  useEffect(() => {
    setVariant(() => product.getVariant(combination));
  }, [combination]);

  useEffect(() => {
    onChange(variant ? variant.getData() : null);
  }, [variant]);

  /**
   *
   * @param value
   * @param id
   */
  const _onChange = (value: string, id: string) => {
    setCombination(v => ({ ...v, [id]: value }));
  };

  return combination && <>
    {
      product.optionsData.map(i =>
        <Select
          key={i.id}
          label={i.label}
          value={combination[i.id]}
          options={i.options}
          onChange={v => _onChange(v, i.id)}
        />,
      )
    }
  </>;
};

export default VariantSelector;

type Props = {
  product: ProductType,
  onChange: (variant: Variant | null) => {}
};
