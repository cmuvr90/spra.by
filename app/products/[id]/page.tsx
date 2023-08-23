import Accordion from '@/components/Accordion';
import Tabs from '@/components/Tabs';
import DoubleSlider from '@/components/DoubleSlider';
import Api from '@/core/services/Api';
import Config from '@/core/config';
import { Product } from '@/core/services/Product';
import VariantSelector from '@/components/VariantSelector';
import { Variant } from '@/core/types/Variant';
import { revalidatePath } from 'next/cache';


const api = new Api({ baseUrl: Config.API_BASE_URL });
let variant: Variant | null = null;

export default async function ProductPage({ params: { id } }: Props) {
  const { data, status } = await api.products.get(id);
  const product = data ? new Product(data) : null;

  async function changeVariant(value: Variant | null) {
    'use server';
    variant = value;
    revalidatePath(`/products/${id}`);
  }

  return product && (
    <main>
      <div className='container mx-auto grid gap-10 grid-cols-12'>
        <div className='flex gap-7 flex-col col-span-12 lg:col-span-6 xl:col-span-7'>
          <DoubleSlider images={product.getImagesSrc()} startImage={variant?.image?.src ?? null} />
          <Tabs
            tabs={[
              {
                label: 'Описание',
                value:
                  '1 sdfbsdb Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quos alias ipsam in eligendi blanditiis sint et, ratione nisi vero voluptates, amet mollitia perferendis nostrum minima atque sunt rerum at.',
              },
              {
                label: 'Характеристики',
                value:
                  '2 sdvsdvfdsb Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quos alias ipsam in eligendi blanditiis sint et, ratione nisi vero voluptates, amet mollitia perferendis nostrum minima atque sunt rerum at.',
              },
              {
                label: 'Способы доставки',
                value:
                  '3 sdvssdcvsv Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quos alias ipsam in eligendi blanditiis sint et, ratione nisi vero voluptates, amet mollitia perferendis nostrum minima atque sunt rerum at.',
              },
              {
                label: 'Условия возврата',
                value:
                  '4 sdvssdcvcascsacsv Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quos alias ipsam in eligendi blanditiis sint et, ratione nisi vero voluptates, amet mollitia perferendis nostrum minima atque sunt rerum at.',
              },
            ]}
          />
          <div className='h-px bg-gray-200'></div>
        </div>
        <div className='flex gap-7 flex-col col-span-12 lg:col-span-6 xl:col-span-5'>
          <h2 className='text-2xl font-semibold'>{product.getTitle()}</h2>
          <div className='grid grid-cols-2 gap-3'>
            <label
              className={`${!!variant ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-200'} transition-colors duration-300 text-center text-white p-3 rounded-md`}>
              <button disabled={!variant}>Заказать</button>
            </label>
            <label
              className='bg-white text-center text-purple-600 hover:bg-purple-700 hover:text-white transition-colors duration-300 p-3 rounded-md border border-purple-600'>
              <button>Контакты</button>
            </label>
          </div>
          <Accordion label='Дополнительная информация' />
          <div className='h-px bg-gray-200'></div>
          <VariantSelector product={product.getData()} onChange={changeVariant} />
          <div className='h-px bg-gray-200'></div>
        </div>
      </div>
    </main>
  );
}

type Props = {
  params: {
    id: string;
  };
};
