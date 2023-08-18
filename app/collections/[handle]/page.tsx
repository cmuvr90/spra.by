import ProductCart from '@/components/ProductCart';
import defaultData from '../../../storage/default.json';
import Api from '@/core/services/Api';
import Config from '@/core/config';
import { FilterInterface } from '@/core/types';
import { Category } from '@/core/types/CategoryInterface';

import Filter from '@/components/Filter';
import { Option } from '@/core/types/OptionInterface';
import { revalidatePath } from 'next/cache';
import FilterPanel from '@/components/FilterPanel';

let products = [];
const api = new Api({ baseUrl: Config.API_BASE_URL });

export default async function Collection({ params: { handle } }: { params: { handle: string } }) {
  let { data: collection, status, error = null } = await api.collections.get(handle);

  async function updateFilter(value: any) {
    'use server';
    console.log('DATA = ', value);

    /*     const products = await api.products.get({ options: [value] });
    console.log('PRODUCTS = ', products); */

    /*  console.log('TEST111 !!!!!!! ', defaultData);
    products = defaultData.products; */
    revalidatePath('/');
  }

  return (
    <main className="container mx-auto grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <FilterPanel categories={collection?.categories ?? []} onChange={updateFilter} />
      </div>
      <div className="col-span-9">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {products.map((product, index) => {
            return <ProductCart product={product} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}
