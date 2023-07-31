import defaultData from '../../../storage/default.json';
import Accordion from '@/components/Accordion';
import Tabs from '@/components/Tabs';
import Select from '@/components/Select';
import DoubleSlider from '@/components/DoubleSlider';

type Props = {
  product: {
    title: string;
    image?: string;
    images: string[];
  };
};

export default function Product({ product = defaultData.product }: any) {
  return (
    <main>
      <div className="container mx-auto grid gap-10 grid-cols-12">
        <div className="flex gap-7 flex-col col-span-12 lg:col-span-6 xl:col-span-7">
          <DoubleSlider
            images={[
              'https://api.spra.by/images/brand/6473099e543288ea164fee05/products/64a16dcb20ae2a824f4351f5/sp-202307021238130032.jpeg',
              'https://avatars.mds.yandex.net/i?id=43131c522436b4d49d2229d770e7d46f-4766550-images-thumbs&n=13&exp=1',
              'https://avatars.mds.yandex.net/i?id=31b6375bebb40ffbb28ca32ebf0e6de2-5311685-images-thumbs&n=13&exp=1',
              'https://avatars.mds.yandex.net/i?id=7b9ab108d7cdcd2cfbff44e6d423ced9-5673334-images-thumbs&n=13&exp=1',
              'https://avatars.mds.yandex.net/i?id=7ee764dec4cc15fa74f03c138979ab16-5346024-images-thumbs&n=13&exp=1',
              'https://avatars.mds.yandex.net/i?id=43131c522436b4d49d2229d770e7d46f-4766550-images-thumbs&n=13&exp=1',
              'https://avatars.mds.yandex.net/i?id=31b6375bebb40ffbb28ca32ebf0e6de2-5311685-images-thumbs&n=13&exp=1',
            ]}
          />
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
          <div className="h-px bg-gray-200"></div>
        </div>
        <div className="flex gap-7 flex-col col-span-12 lg:col-span-6 xl:col-span-5">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300 text-center text-white p-3 rounded-md">
              <button>Заказать</button>
            </label>
            <label className="bg-white text-center text-purple-600 hover:bg-purple-700 hover:text-white transition-colors duration-300 p-3 rounded-md border border-purple-600">
              <button>Контакты</button>
            </label>
          </div>
          <Accordion label="Дополнительная информация" />
          <div className="h-px bg-gray-200"></div>
          <Select
            label="Название параметра"
            options={[
              { label: 'опция 1', value: '1' },
              { label: 'опция 2', value: '2' },
              { label: 'опция 3', value: '3' },
            ]}
          />
          <Select
            label="Название параметра"
            options={[
              { label: 'опция 1', value: '1' },
              { label: 'опция 2', value: '2' },
              { label: 'опция 3', value: '3' },
            ]}
          />
          <Select
            label="Название параметра"
            options={[
              { label: 'опция 1', value: '1' },
              { label: 'опция 2', value: '2' },
              { label: 'опция 3', value: '3' },
            ]}
          />
          <div className="h-px bg-gray-200"></div>
        </div>
      </div>
    </main>
  );
}
