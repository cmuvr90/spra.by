import ProductCart from '@/components/ProductCart';
import Api from '@/core/services/Api';
import Config from '@/core/config';
import { revalidatePath } from 'next/cache';
import FilterPanel from '@/components/FilterPanel';
import { FilterCommonValueType } from '@/core/types/Filter';
import { Product } from '@/core/types/Product';
import { FetchResponseStatus } from '@/core/types/Fetcher';

let products: Product[] = [];
const api = new Api({ baseUrl: Config.API_BASE_URL });

export default async function Collection({ params: { handle } }: Props) {
  const { data: collection, status } = await api.collections.get(handle);

  async function updateFilter(value: FilterCommonValueType[], categories: string[]) {
    'use server';
    const options = value.map(i => ({ ids: i.ids, values: i.values }));
    products = await getProducts({ options, categories });
    revalidatePath('/');
  }

  return (
    <main className='container mx-auto grid grid-cols-12 gap-5'>
      <div className='col-span-3'>
        <FilterPanel
          categories={collection ? collection.categories : []}
          onChange={updateFilter}
        />
      </div>
      <div className='col-span-9'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
          {
            products.map((product, index) => {
              return <ProductCart product={product} key={index} />;
            })
          }
        </div>
      </div>
    </main>
  );
}

/**
 *
 * @param params
 */
async function getProducts(params: any) {
  const { data, status } = await api.products.list(params);
  if (status === FetchResponseStatus.SUCCESS && Array.isArray(data)) return data;
  return [];
}

type Props = {
  params: {
    handle: string
  }
}
