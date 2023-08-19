import ProductCart from '@/components/ProductCart';
import Api from '@/core/services/Api';
import Config from '@/core/config';
import { revalidatePath } from 'next/cache';
import FilterPanel from '@/components/FilterPanel';
import { FilterCommonValueType } from '@/core/types/Filter';
import { ProductInterface } from '@/core/types';

let products: ProductInterface[] = [];

const api = new Api({ baseUrl: Config.API_BASE_URL });

export default async function Collection({ params: { handle } }: { params: { handle: string } }) {
  let { data: collection, error } = await api.collections.get(handle);

  async function updateFilter(value: FilterCommonValueType[], categories: string[]) {
    'use server';

    const options = value.map(i => ({ ids: i.ids, values: i.values }));
    const { data } = await api.products.get({ options, categories });
    products = data;

    console.log('PRODUCTS = ', products);

    /*  console.log('TEST111 !!!!!!! ', defaultData);
    products = defaultData.products; */
    revalidatePath('/');
  }

  return (
    <main className='container mx-auto grid grid-cols-12 gap-5'>
      <div className='col-span-3'>
        <FilterPanel
          categories={collection?.categories ?? []}
          onChange={updateFilter}
        />
      </div>
      <div className='col-span-9'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
          {JSON.stringify(products)}
          {products.map((product, index) => {
            return <ProductCart product={product} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}
